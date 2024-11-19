import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import styled from 'styled-components';
import "./Calendar.css";

const CalendarContainer = styled.div`
    display: flex; 
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 중앙 정렬 */
    padding: 10px;
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
    color: ${props => (props.isPastMonth ? '#D9D9D9' : props.isSelected ? 'white' : 'black')}; 
    background-color: ${props => (props.isSelected ? '#222222' : 'transparent')}; /* 선택된 날짜의 배경색 */
    cursor: pointer; /* 클릭할 수 있는 느낌을 주기 위해 커서 변경 */
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
    color: ${props => (props.isWeekend ? 'red' : 'black')}; /* 토일만 빨간색 */
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

function Calendar({ onDateSelect }) {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const startOfCalendar = startOfWeek(start, { weekStartsOn: 0 });
    const endOfCalendar = endOfWeek(end, { weekStartsOn: 0 });
    const calendarDays = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

    const handleDayClick = (day) => {
        setSelectedDate(day);
        if (onDateSelect) {
            onDateSelect(day); // 부모 컴포넌트에 선택된 날짜 전달
        }
    };

    return (
        <CalendarContainer>
            <Navigation>
            <YearMonthContainer>
                <Button onClick={() => setDate(prev => {
                    const newDate = new Date(prev);
                    newDate.setMonth(newDate.getMonth() - 1);
                    return newDate;
                                })}>&lt;</Button>
                    <YearMonth>{format(date, 'yyyy년 MM월')}</YearMonth>
                    <Button onClick={() => setDate(prev => {
                        const newDate = new Date(prev);
                        newDate.setMonth(newDate.getMonth() + 1);
                        return newDate;
                    })}>&gt;</Button>
                </YearMonthContainer>
            </Navigation>
            <WeekdayContainer>
                {['일', '월', '화', '수', '목', '금', '토'].map((weekday, index) => (
                    <Weekday key={weekday} isWeekend={index === 6 || index === 0}>{weekday}</Weekday>
                ))}
            </WeekdayContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {calendarDays.map(day => {
                    const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                    const isPastMonth = !isSameMonth(date, day); // 현재 월과 같지 않은 경우

                    return (
                        <Day
                            key={day}
                            isSelected={isSelected}
                            isPastMonth={isPastMonth} // 지난달/다음달 여부
                            onClick={() => handleDayClick(day)}
                        >
                            {format(day, 'd')}
                        </Day>
                    );
                })}
            </div>
        </CalendarContainer>
    );
}

export default Calendar;
