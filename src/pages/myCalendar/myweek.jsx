import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import styled from "styled-components";

const Button = styled.button`
    cursor: pointer;
    padding: 5px 5px;
    border: none;
    background-color: transparent; /* 배경을 투명하게 */
    color: black;
    font-size: 20px; 
    font-family : 'pretendard';
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

  // 주의 시작일을 계산
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // 0은 일요일 시작

  // 일주일의 날짜 배열
  const weekDays = Array.from({ length: 7 }, (_, index) => 
    addDays(weekStart, index)
  );

  // 다음 주로 넘어가는 함수
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  // 이전 주로 넘어가는 함수
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  // 날짜 클릭 시 동작할 함수
  const handleDateClick = (day) => {
    alert(`${format(day, 'yyyy년 MM월 dd일')} 클릭됨!`);
  };

  return (
    <div>
      <YearMonthContainer>
        <Button onClick={goToPreviousWeek}>&lt;</Button>
        <div>{format(weekStart, 'yyyy년 MM월')}</div>
        <Button onClick={goToNextWeek}>&gt;</Button>
      </YearMonthContainer>
      <table>
        <tbody>
          <tr>
            {weekDays.map((day) => (
              <TableCell key={day} onClick={() => handleDateClick(day)}>
                <strong>{format(day, 'd')}</strong><br />{/* 날짜를 볼드체로 표시 */}
                {['일', '월', '화', '수', '목', '금', '토'][day.getDay()]} {/* 요일 표시 */}
              </TableCell>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeekCalendar;
