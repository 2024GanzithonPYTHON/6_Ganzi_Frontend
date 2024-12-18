import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, addMonths } from 'date-fns';
import styled from "styled-components";
import api from '../auth/axiosInstance';

const Button = styled.button`
    cursor: pointer;
    padding: 5px 5px;
    border: none;
    background-color: transparent;
    color: black;
    font-size: 20px; 
    font-family: 'pretendard';
    font-weight: lighter; 
`;

const YearMonthContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-grow: 1; 
`;

const TableCell = styled.td`
    text-align: center; 
    cursor: pointer; 
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 20px;
    width: 35px;
    &:hover {
        background-color: black;
        color: white;
    }
`;

const ScheduleContainer = styled.div`
    width: 359px;
    height: auto; /* 높이를 자동으로 조정 */
    border-radius: 20px;
    background-color: var(--Color-3, #F8D785);
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

// MySchedulelist Component
const MySchedulelist = ({ schedules = [], loading, error, selectedDate }) => {
    return (
        <ScheduleContainer>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {schedules.length === 0 && !loading && !error ? (
                <p>해당 날짜에 스케줄이 없습니다.</p>
            ) : (
                schedules.map(schedule => {
                    // 선택한 날짜와 스케줄 날짜가 일치할 때만 렌더링
                    if (schedule.schedule_date === selectedDate) {
                        return (
                            <div key={schedule.personal_schedule_id}>
                                <h2>{schedule.schedule_title}</h2>
                                <p>{schedule.schedule_date}</p>
                                <p>{schedule.start_time} - {schedule.end_time}</p>
                            </div>
                        );
                    }
                    return null; // 일치하지 않으면 아무것도 렌더링하지 않음
                })
            )}
        </ScheduleContainer>
    );
};

// WeekCalendar Component
const WeekCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); // 오늘 날짜로 초기화

    const getWeekStart = (date) => startOfWeek(date, { weekStartsOn: 0 });
    const weekStart = addWeeks(getWeekStart(currentDate), 1);
    const todayIndex = new Date().getDay();
    
    const weekDays = Array.from({ length: 7 }, (_, index) => 
        addDays(weekStart, index - todayIndex)
    );

    const adjustedWeekStart = addDays(weekStart, -3);

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const goToPreviousMonth = () => {
        setCurrentDate(addMonths(currentDate, -1));
    };

    const goToNextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };

    const goToPreviousWeek = () => {
        setCurrentDate(addWeeks(currentDate, -1));
    };

    const handleDateClick = async (day) => {
        const date = format(day, 'yyyy-MM-dd');
        const url = '/personal/my-schedule/';
        const userAccessToken = localStorage.getItem("access_token");

        const requestBody = {
            schedule_date: date,
        };

        setLoading(true);
        setError(null);
        setSchedules([]); // 이전 스케줄 초기화
        setSelectedDate(date); // 선택된 날짜 업데이트

        try {
            const response = await api.get(url, {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/json',
                },
                params: requestBody,
            });

            console.log('서버에서 반환된 스케줄 데이터:', response.data);
            if (response.data && response.data.schedule) {
                setSchedules(response.data.schedule); // 새 스케줄로 업데이트
            } else {
                setSchedules([]); // 스케줄이 없으면 빈 배열로 설정
            }
        } catch (error) {
            console.error('API 요청 오류:', error.response?.data || error.message);
            setError('스케줄을 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today);
    }, []);

    return (
        <div>
            <YearMonthContainer>
                <Button onClick={goToPreviousMonth}>&lt;</Button>
                <div>{format(adjustedWeekStart, 'yyyy년 MM월')}</div>
                <Button onClick={goToNextMonth}>&gt;</Button>
            </YearMonthContainer>
            <YearMonthContainer>
                <Button onClick={goToPreviousWeek}>&lt;</Button>
                <table>
                    <tbody>
                        <tr>
                            {weekDays.map((day) => (
                                <TableCell key={day} onClick={() => handleDateClick(day)}>
                                    <strong>{format(day, 'd')}</strong><br />
                                    {['일', '월', '화', '수', '목', '금', '토'][day.getDay()]}
                                </TableCell>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <Button onClick={goToNextWeek}>&gt;</Button>
            </YearMonthContainer>
            <MySchedulelist schedules={schedules} loading={loading} error={error} selectedDate={selectedDate} />
        </div>
    );
};

export default WeekCalendar;
