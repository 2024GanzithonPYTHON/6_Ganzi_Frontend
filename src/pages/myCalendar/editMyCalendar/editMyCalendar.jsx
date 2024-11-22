import React, { useState } from "react";
import styled from 'styled-components';

import Calendar from "../../familycalendar/Calendar";
import EditDate from "./EditDate"; // EditDate 컴포넌트 임포트

const ScheduleContainer = styled.div`
    margin-top: 20px;
`;

function EditMyCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsEditing(true); // 날짜 선택 시 편집 모드 활성화
    };

    const handleToggleEdit = () => {
        setIsEditing(prev => !prev); // 편집 모드 토글
    };

    return (
        <div>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
                <ScheduleContainer>
                    <h3>{selectedDate.toLocaleDateString()}의 스케줄</h3>
                    <button onClick={handleToggleEdit}>
                        {isEditing ? '편집 종료' : '편집하기'}
                    </button>
                    {isEditing && (
                        <EditDate date={selectedDate} onToggleEdit={handleToggleEdit} />
                    )}
                </ScheduleContainer>
            )}
        </div>
    );
}

export default EditMyCalendar;
