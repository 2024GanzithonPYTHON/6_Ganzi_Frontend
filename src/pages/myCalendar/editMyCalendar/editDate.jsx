import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const EditDateContainer = styled.div`
    margin-top: 10px;
`;

function EditDate({ date, onToggleEdit }) {
    const [schedule, setSchedule] = useState('');

    useEffect(() => {
        // 이곳에서 날짜에 대한 기존 스케줄을 불러올 수 있음
        // 예를 들어, API 호출로 기존 스케줄을 가져오는 로직을 추가할 수 있습니다.
        // setSchedule(기존 스케줄);
    }, [date]);

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    const handleSave = () => {
        // 여기에 스케줄 저장 로직을 추가
        console.log(`저장된 스케줄: ${schedule} (${date.toLocaleDateString()})`);
        onToggleEdit(); // 편집 모드 종료
    };

    return (
        <EditDateContainer>
            <textarea 
                rows="4" 
                value={schedule} 
                onChange={handleScheduleChange} 
                placeholder="여기에 스케줄을 입력하세요."
            />
            <button onClick={handleSave}>저장</button>
        </EditDateContainer>
    );
}

export default EditDate;
