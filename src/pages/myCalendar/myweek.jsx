import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 주의 시작일을 계산합니다.
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // 0은 일요일 시작

  // 일주일의 날짜 배열을 만듭니다.
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

  return (
    <div>
      <h2>{format(weekStart, 'yyyy년 MM월 dd일')} - {format(addDays(weekStart, 6), 'yyyy년 MM월 dd일')} 주간</h2>
      <div>
        <button onClick={goToPreviousWeek}>이전 주</button>
        <button onClick={goToNextWeek}>다음 주</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((day) => (
              <td key={day}>{format(day, 'd')}</td> // 날짜만 표시
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeekCalendar;
