import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, addMonths } from 'date-fns';
import styled from "styled-components";
import api from '../auth/axiosInstance'; // api 모듈 import

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

const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

    try {
      const response = await api.get(url, {
        headers: {
          'Authorization': `Bearer ${userAccessToken}`,
          'Content-Type': 'application/json',
        },
        params: requestBody,
      });

      console.log('서버에서 반환된 스케줄 데이터:', response.data);
    } catch (error) {
      console.error('API 요청 오류:', error.response?.data || error.message);
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
    </div>
  );
};

export default WeekCalendar;
