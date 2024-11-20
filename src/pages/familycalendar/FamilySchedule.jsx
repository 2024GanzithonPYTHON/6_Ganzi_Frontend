import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Mock Data -> 후에 이미지까지 올 예정
const mockSchedules = [
    {
        personal_schedule_id: 1,
        schedule_title: "결혼기념일",
        schedule_date: "2024-11-16",
        start_time: "10:00:00",
        end_time: "12:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
    {
        personal_schedule_id: 2,
        schedule_title: "주간 회의",
        schedule_date: "2024-11-20", // 주간 회의는 매주 수요일
        start_time: "14:00:00",
        end_time: "15:00",
        is_daily: false,
        is_weekly: true,
        is_monthly: false,
        is_yearly: false,
    },
    {
        personal_schedule_id: 3,
        schedule_title: "운동",
        schedule_date: "2024-11-21", // 매일
        start_time: "06:00:00",
        end_time: "07:00",
        is_daily: true,
        is_weekly: false,
        is_monthly: false,
        is_yearly: false,
    },
    {
        personal_schedule_id: 4,
        schedule_title: "가족 모임",
        schedule_date: "2024-12-01", // 매년
        start_time: "18:00:00",
        end_time: "21:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
    {
        personal_schedule_id: 5,
        schedule_title: "생일 파티",
        schedule_date: "2024-11-30", // 매년
        start_time: "17:00:00",
        end_time: "20:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
];

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

    useEffect(() => {
        const fetchSchedules = () => {
            const filteredSchedules = mockSchedules.filter(schedule => {
                return isScheduleVisible(schedule, selectedDate);
            });

            setSchedules(filteredSchedules);
        };

        if (selectedDate) {
            fetchSchedules();
        }
    }, [selectedDate]);

    const isScheduleVisible = (schedule, date) => {
        const scheduleDate = new Date(schedule.schedule_date);
        const selectedDateObj = new Date(date);
        
        // 날짜 비교
        const isSameDate = scheduleDate.toDateString() === selectedDateObj.toDateString();
        const isDaily = schedule.is_daily === true;
        const isWeekly = schedule.is_weekly === true && selectedDateObj.getDay() === 2; // 화요일

        return isSameDate || isDaily || isWeekly;
    };

    return (
        <ScheduleContainer>
            {schedules.length === 0 ? (
                <p>일정이 없습니다.</p>
            ) : (
                schedules.map(schedule => (
                    <ScheduleItem key={schedule.personal_schedule_id}>
                        <GraySquare />
                        <CategoryContainer>
                            Category: {schedule.personal_schedule_id}
                        </CategoryContainer>
                        <InfoContainer>
                            <ScheduleTitle>{schedule.schedule_title}</ScheduleTitle>
                            <ScheduleTime>{schedule.start_time} - {schedule.end_time}</ScheduleTime>
                        </InfoContainer>
                    </ScheduleItem>
                ))
            )}
        </ScheduleContainer>
    );
};

export default FamilySchedule;