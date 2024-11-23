import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../auth/axiosInstance';

const ScheduleContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ScheduleItem = styled.div`
    width: 333px;
    height: 109px;
    flex-shrink: 0;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    padding: 10px; /* 패딩 추가 */
    text-align: left; /* 텍스트 왼쪽 정렬 */

    &:hover {
        border: 0px solid #ffff;
        background-color:  #F8D785; 
    }
`;

const GraySquare = styled.div`
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    background: #6E6C6C;
    margin-right: 10px; /* 오른쪽 마진 추가 */
    margin-top: 5px;
`;

const CategoryContainer = styled.div`
    width: 67px;
    height: 21px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #6E6C6C;
    display: flex;
    justify-content: center; 
    align-items: center;

    color: #F8D785;
    font-size: 10px;
    font-weight: 300;
    margin-right: 10px; /* 스케줄 제목과 간격 추가 */
`;

const InfoContainer = styled.div`
   display: flex;
    flex-direction: column;
    align-items: flex-start; /* 위쪽 정렬로 변경 */
    height: 100%; /* 전체 높이를 사용하여 중앙 정렬 */
`;

const ScheduleTitle = styled.div`
    font-weight: bold;
    height: 15px;
    line-height: 21px; 
    `

const ScheduleTime = styled.div`
    color: black;
    font-size: 15px;
    margin-top: 10px;
`;

const Memo = styled.div`
    padding: 10px;
    background-color: #fff8dc; /* 메모 배경색 */
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-top: 5px;
    width: 100%;
`;

const FamilySchedule = ({ selectedDate }) => {
    const [schedules, setSchedules] = useState([]);
    const userAccessToken = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchSchedules = async () => {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // 1월은 0이므로 +1
            const day = String(selectedDate.getDate()).padStart(2, '0');

            try {
                const response = await api.get(`/family/calendar/${year}/${month}/${day}/`, {
                    headers: {
                        'Authorization': `Bearer ${userAccessToken}`,
                    },
                });
                console.log('API 응답:', response.data); // 응답 데이터 확인
                setSchedules(response.data); // 받은 데이터를 상태에 저장
            } catch (error) {
                console.error('API 요청 오류:', error.message);
            }
        };

        if (selectedDate) {
            fetchSchedules(); // 선택된 날짜가 있을 때만 데이터 요청
        }
    }, [selectedDate]);

    const isScheduleVisible = (schedule, date) => {
        const scheduleStartDate = new Date(`${date.toISOString().split('T')[0]}T${schedule.schedule_start_time}:00`); // 선택된 날짜와 시작 시간을 결합
        const selectedDateObj = new Date(date);
        
        // 날짜 비교
        const isSameDate = scheduleStartDate.toDateString() === selectedDateObj.toDateString();
        return isSameDate; // is_daily와 is_weekly 조건 제거
    };

    const visibleSchedules = schedules.filter(schedule => isScheduleVisible(schedule, selectedDate));
    console.log('가시적인 스케줄:', visibleSchedules); // 필터링된 스케줄 확인

    return (
        <ScheduleContainer>
            {visibleSchedules.length === 0 ? (
                <p>일정이 없습니다.</p>
            ) : (
                visibleSchedules.map(schedule => (
                    <ScheduleItem key={schedule.schedule_title}> {/* 고유 ID가 없다면 다른 필드 사용 */}
                        <GraySquare />
                        <CategoryContainer>
                            Category: {schedule.category_name} {/* category_name으로 수정 */}
                        </CategoryContainer>
                        <InfoContainer>
                            <ScheduleTitle>{schedule.schedule_title}</ScheduleTitle>
                            <ScheduleTime>{schedule.schedule_start_time} - {schedule.schedule_end_time}</ScheduleTime>
                        </InfoContainer>
                    </ScheduleItem>
                ))
            )}
        </ScheduleContainer>
    );
};

export default FamilySchedule;
