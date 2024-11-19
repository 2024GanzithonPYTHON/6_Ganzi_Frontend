import React, {useState} from 'react';
import styled from 'styled-components';
import Calendar from "./Calendar";
import FamilySchedule from "./FamilySchedule";


const ScheduleContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

function FamilyCalendar() {
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가

    const handleDateSelect = (date) => {
        setSelectedDate(date); // 선택된 날짜를 상태로 저장
    };

    return (
        <div>
            <h2>가족 일정 기록</h2>
            <Calendar onDateSelect={handleDateSelect} />
            {/* 선택된 날짜를 FamilySchedule에 전달 */}
            {selectedDate && (
                <ScheduleContainer>
                    <h3>{selectedDate.toLocaleDateString()}의 스케줄</h3>
                    <FamilySchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
                </ScheduleContainer>
            )}

        </div>
    );
}
export default FamilyCalendar;