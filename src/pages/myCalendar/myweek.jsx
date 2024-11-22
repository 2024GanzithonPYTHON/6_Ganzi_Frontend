import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, addMonths, isSameDay } from 'date-fns';
import styled from "styled-components";

const Button = styled.button`
    cursor: pointer;
    padding: 5px 5px;
    border: none;
    background-color: transparent; /* 배경을 투명하게 */
    color: black;
    font-size: 20px; 
    font-family: 'pretendard';
    font-weight: lighter; /* 피그마에 lighter이라 되어있음 */
`;

const YearMonthContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    flex-grow: 1; /* 남는 공간을 차지하도록 설정 */
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

const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 오늘 날짜를 기준으로 주의 시작일을 계산
  const getWeekStart = (date) => startOfWeek(date, { weekStartsOn: 0 });

  // 주의 시작일을 계산 -> 이유모르겠는데 자꾸 전주로 렌더링해옴 일단 담주렌더링
  const weekStart = addWeeks(getWeekStart(currentDate), 1);

  // 오늘 날짜의 인덱스 계산
  const todayIndex = new Date().getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  // 오늘을 기준으로 한주를 배열로 생성
  const weekDays = Array.from({ length: 7 }, (_, index) => 
    addDays(weekStart, index - (todayIndex)) // 오늘을 중앙에 두기 위해 조정
  );

  // 주의 시작일을 오늘을 기준으로 조정
  const adjustedWeekStart = addDays(weekStart, -3); // 중앙에 오게 하려면 3일을 뺌

  // 다음 달로 넘어가는 함수
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // 이전 달로 넘어가는 함수
  const goToPreviousMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  // 다음 주로 넘어가는 함수
  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  // 이전 주로 넘어가는 함수
  const goToPreviousWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1));
  };

  // 날짜 클릭 시 동작할 함수
  const handleDateClick = (day) => {
    alert(`${format(day, 'yyyy년 MM월 dd일')} 클릭됨!`);
  };

  // 컴포넌트가 마운트될 때 오늘 날짜로 초기화
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today); // 오늘 날짜로 초기화
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
    </div>
  );
};


export default WeekCalendar;
