import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import styled from 'styled-components';
import "./Calendar.css";

const CalendarContainer = styled.div`
    display: flex; 
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 중앙 정렬 */
    padding: 20px;
    width: 393px; 
`;

const Day = styled.div`
    width: 45px; 
    height: 45px;
    border-radius: 10px;
    border: 0.5px solid #000;
    margin: 1.5px;  
    text-align: center;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-weight: normal; 
    color: ${props => (props.isPastMonth ? '#D9D9D9' : 'black')}; 
`;

const WeekdayContainer = styled.div`
    display: flex; 
    width: 100%; 
    justify-content: center; 
`;

const Weekday = styled.div`
    width: 45px;
    height: 20px; 
    margin: 0 1.5px 8px;
    text-align: center;
    color: ${props => (props.isWeekend ? 'red' : 'black')}; /* 금요일과 토요일만 빨간색 */
`;

const YearMonthContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-grow: 1; /* 남는 공간을 차지하도록 설정 */
`;

const YearMonth = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin: 0 5px; /* 버튼과의 간격*/
`;

const Navigation = styled.div`
    display: flex;
    align-items: center; 
    width: 100%;
    margin-bottom: 10px;
`;

const Button = styled.button`
    cursor: pointer;
    padding: 5px 5px;
    border: none;
    background-color: transparent; /* 배경을 투명하게 */
    color: black;
    font-size: 20px; 
    font-weight: lighter; /* 피그마에 lighter이라 되어있음 */
`;

function Calendar() {
    const [date, setDate] = useState(new Date());

    // 현재 달의 시작과 종료 날짜
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    // 캘린더의 시작 날짜 (주 단위)
    const startOfCalendar = startOfWeek(start, { weekStartsOn: 0 });
    const endOfCalendar = endOfWeek(end, { weekStartsOn: 0 }); // 주 단위로 끝 날짜 설정

    // 전체 캘린더 날짜 배열 생성
    const calendarDays = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

    const handlePreviousMonth = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);
            return newDate;
        });
    };

    return (
        <CalendarContainer>
            <Navigation>
                <YearMonthContainer>
                    <Button onClick={handlePreviousMonth}>&lt;</Button>
                    <YearMonth>{format(date, 'yyyy년 MM월')}</YearMonth>
                    <Button onClick={handleNextMonth}>&gt;</Button>
                </YearMonthContainer>
            </Navigation>
            <WeekdayContainer>
                {['일', '월', '화', '수', '목', '금', '토'].map((weekday, index) => (
                    <Weekday key={weekday} isWeekend={index === 6 || index === 0}>{weekday}</Weekday>
                ))}
            </WeekdayContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {calendarDays.map(day => {
                    const isFirstDay = format(day, 'd') === '1';
                    const isPastMonth = !isSameMonth(start, day);
                    return (
                        <Day key={day} isFirstDay={isFirstDay} isPastMonth={isPastMonth}>
                            {format(day, 'd')}
                        </Day>
                    );
                })}
            </div>
        </CalendarContainer>
    );
}

export default Calendar;
