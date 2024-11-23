import React, { useState } from "react";
import styled from 'styled-components';

import Calendar from "../../familycalendar/Calendar";
import EditDate from "./EditDate";
import SelectedDate from "./selectedDay";

const ScheduleContainer = styled.div`
    margin-top: 20px;
`;

const ButtonContainer = styled.div`
    margin-top: 10px;
`;

const StyledButton = styled.button`
    width: 276px;
    height: 43.74px;
    flex-shrink: 0;
    border-radius: 10px;
    border: none;
    background: var(--Linear, linear-gradient(95deg, #F8D785 29.47%, #FFFD8A 72.69%));
    font-size: 14px;
    font-family: "Pretendard Variable";
    cursor: pointer;
    margin-bottom: 10px;
`;
const DeleteButton = styled.button`
    width: 276px;
    height: 43.74px;
    flex-shrink: 0;
    border-radius: 10px;
    border: none;
    border-radius: 10px;
    background: #F2F2F2;
    font-size: 14px;
    font-family: "Pretendard Variable";
    cursor: pointer; // 커서 스타일 추가
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

    const handleSave = () => {
        // 저장 로직을 여기에 추가
        console.log(`저장된 날짜: ${selectedDate}`);
        // 예를 들어, API 호출 등을 통해 저장할 수 있습니다.
        handleToggleEdit(); // 편집 모드 종료
    };

    const handleDelete = () => {
        // 삭제 로직을 여기에 추가
        console.log(`삭제된 날짜: ${selectedDate}`);
        // 예를 들어, API 호출 등을 통해 삭제할 수 있습니다.
        setSelectedDate(null); // 선택된 날짜 초기화
        handleToggleEdit(); // 편집 모드 종료
    };

    return (
        <div>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
                <ScheduleContainer>
                    {isEditing && (
                        <SelectedDate date={selectedDate} onToggleEdit={handleToggleEdit} />
                    )}
                    <ButtonContainer>
                        <StyledButton onClick={handleSave}>저장하기</StyledButton>
                        <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                    </ButtonContainer>
                </ScheduleContainer>
            )}
        </div>
    );
}

export default EditMyCalendar;