import React, { useState } from "react";
import styled from 'styled-components';

const RepeatedScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const StartTimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
    color: #FF4D4D;  // 빨간색
`;

const SelectContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 70px;
`;

const FrequencyContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const FrequencyButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    margin: 0 5px;
    background-color: ${props => (props.active ? '#F8D785' : '#fff')};
    color: ${props => (props.active ? 'black' : '#ccc')};
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0c06a;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

function RepeatedSchedule() {
    const [startHour, setStartHour] = useState('N시');
    const [startMinute, setStartMinute] = useState('N분');
    const [frequency, setFrequency] = useState('1'); // 기본값 1
    const [schedule, setSchedule] = useState('');

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    return (
        <RepeatedScheduleContainer>
            <StartTimeContainer>
                <Label>시작하는 날짜가 언제인가요?</Label>
                <SelectContainer>
                    <Select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                        <option value="N시">N시</option>
                        {[...Array(24).keys()].map(hour => (
                            <option key={hour} value={hour}>{hour}시</option>
                        ))}
                    </Select>
                    <Select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
                        <option value="N분">N분</option>
                        {[0, 15, 30, 45].map(minute => (
                            <option key={minute} value={minute}>{minute}분</option>
                        ))}
                    </Select>
                </SelectContainer>
            </StartTimeContainer>

            <Label>스케줄의 주기를 선택해 주세요.</Label>
            <FrequencyContainer>
                <FrequencyButton active={frequency === '1'} onClick={() => setFrequency('1')}>1 데일리</FrequencyButton>
                <FrequencyButton active={frequency === '7'} onClick={() => setFrequency('7')}>7 위클리</FrequencyButton>
                <FrequencyButton active={frequency === '30'} onClick={() => setFrequency('30')}>30 먼슬리</FrequencyButton>
            </FrequencyContainer>

            <Input 
                value={schedule} 
                onChange={handleScheduleChange} 
                placeholder="스케줄명을 입력해 주세요." 
            />
            <div>{schedule.length}/15</div>
        </RepeatedScheduleContainer>
    );
}

export default RepeatedSchedule;
