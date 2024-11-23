import React, { useState } from "react";
import styled from 'styled-components';
import api from "../../../api/api";
import Calendar from "../../familycalendar/Calendar";
import EditDate from "./editDate";
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
    const [personalScheduleId, setPersonalScheduleId] = useState(null); // 스케줄 ID 상태 추가

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsEditing(true); // 날짜 선택 시 편집 모드 활성화
        // 여기서 personalScheduleId를 설정하는 로직을 추가할 수 있습니다.
        // 예를 들어, 날짜에 해당하는 스케줄 ID를 가져오는 API 호출 등을 할 수 있습니다.
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

    const handleDelete = async () => {
        try {
            await api.delete(`/personal/schedule/${personalScheduleId}/`); // DELETE 요청
            console.log(`삭제된 스케줄 ID: ${personalScheduleId}`);
            // 삭제 후 상태 초기화
            setSelectedDate(null);
            setPersonalScheduleId(null);
            handleToggleEdit(); // 편집 모드 종료
        } catch (error) {
            console.error('삭제 오류:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
                <ScheduleContainer>
                    {isEditing && (
                        <SelectedDate 
                            date={selectedDate} 
                            onToggleEdit={handleToggleEdit} 
                            setPersonalScheduleId={setPersonalScheduleId} // ID 설정을 위한 prop 추가
                        />
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
