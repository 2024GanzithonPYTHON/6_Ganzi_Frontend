import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek } from 'date-fns';
import styled from 'styled-components';
import "./Calendar.css";

const CalendarContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; /* 영역내 줄바꿈 */
    justify-content: flex-start; /* 왼쪽 정렬 */
    padding: 20px;
    width: 393px; 
`;

const Day = styled.div`
    width: 45px; /* 고정 너비 설정 */
    height: 45px; /* 고정 높이 설정 */
    border-radius: 10px;
    border: 0.5px solid #000;
    margin: 1.5px; /* 날짜 간의 간격 설정 */
    text-align: center;
    display: flex; /* 내용 중앙 정렬을 위한 flex 사용 */
    align-items: center; 
    justify-content: center; 
`;

const WeekdayContainer = styled.div`
    display: flex; /* 요일을 가로로 나열 */
    width: 100%; /* 전체 너비 사용 */
    justify-content: flex; /* 왼쪽 정렬 */
    margin-bottom: 5px; /* 요일과 날짜 사이 간격 */
`;

const Weekday = styled.div`
    width: 45px; /* 날짜와 너비를 맞추기 위해 동일하게 설정 */
    height: 45px; /* 날짜와 높이를 맞추기 위해 동일하게 설정 */
    text-align: center;
    font-weight: bold;
`;

function Calendar() {
    const [date] = useState(new Date());

    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });

    // 주의 시작 요일을 일요일로 설정
    const startOfCalendar = startOfWeek(start, { weekStartsOn: 0 }); // 0은 일요일
    const endOfCalendar = endOfMonth(end);

    // 전체 달력을 위한 날짜 배열 생성
    const calendarDays = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

    return (
        <CalendarContainer>
            {/* 요일 표시 */}
            <WeekdayContainer>
                {['일', '월', '화', '수', '목', '금', '토'].map((weekday) => (
                    <Weekday key={weekday}>{weekday}</Weekday>
                ))}
            </WeekdayContainer>
            {/* 날짜 표시 */}
            {calendarDays.map(day => (
                <Day key={day}>
                    {format(day, 'd')}
                </Day>
            ))}
        </CalendarContainer>
    );
}

export default Calendar;
