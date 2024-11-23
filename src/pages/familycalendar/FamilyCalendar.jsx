import React, {useState} from 'react';
import styled from 'styled-components';
import Calendar from "./Calendar";
import FamilySchedule from "./FamilySchedule";
import api from '../../api/api';



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