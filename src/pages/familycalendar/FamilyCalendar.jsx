import React, { useState } from 'react';
import Calendar from './Calendar'; // Calendar 컴포넌트 경로
import FamilySchedule from './FamilySchedule'; // FamilySchedule 컴포넌트 경로

function FamilyCalendar() {
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가

    const handleDateSelect = (date) => {
        setSelectedDate(new Date(date)); // 선택된 날짜를 Date 객체로 저장
    };

    return (
        <div>
            <h2>가족 일정 기록</h2>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
                <FamilySchedule selectedDate={selectedDate} /> // Date 객체 전달
            )}
        </div>
    );
}

export default FamilyCalendar;
