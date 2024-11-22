import React, { useState } from "react";
import styled from 'styled-components';

const EditDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const ToggleButtonContainer = styled.div`
    display: flex;
    position: relative;
    width: 285px;
    height: 42px;
    margin-bottom: 10px;
    background-color: #F8D785;
    border-radius: 20px; 
    overflow: hidden;
`;

const ToggleButton = styled.button`
    flex: 1;
    padding: 5px;
    color: black;
    border: none;
    border-radius: 20px; 
    cursor: pointer;
    background-color: transparent; 
    transition: background-color 0.3s; 

    display: flex; 
    align-items: center; 
    justify-content: center; 
    position: relative;
`;

const Indicator = styled.div`
    position: absolute;
    top: 50%;
    left: ${props => (props.active ? '75%' : '25%')}; 
    transform: translate(-50%, -50%);
    width: 128px; 
    height: 30px; 
    background-color: white; 
    border-radius: 20px; 
    transition: left 0.3s;
`;

const InputContainer = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

const Select = styled.select`
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
`;

function SelectedDate({ date, onToggleEdit }) {
    const [isRecurring, setIsRecurring] = useState(false);
    const [schedule, setSchedule] = useState('');
    const [startHour, setStartHour] = useState('N시');
    const [startMinute, setStartMinute] = useState('N분');
    const [endHour, setEndHour] = useState('N시');
    const [endMinute, setEndMinute] = useState('N분');
    const [eventName, setEventName] = useState('기념일');

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    return (
        <div>

            {isRecurring ? (
                <div>
                    <h4>반복되는 일정 설정</h4>
                    {/* 반복되는 일정 설정 내용 */}
                </div>
            ) : (
                <InputContainer>
                    <Label>스케줄명 입력:</Label>
                    <Input 
                        value={schedule} 
                        onChange={handleScheduleChange} 
                        placeholder="스케줄명을 입력해 주세요." 
                    />
                    <Label>시작 시간:</Label>
                    <div>
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
                    </div>
                    <Label>종료 시간:</Label>
                    <div>
                        <Select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                            <option value="N시">N시</option>
                            {[...Array(24).keys()].map(hour => (
                                <option key={hour} value={hour}>{hour}시</option>
                            ))}
                        </Select>
                        <Select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}>
                            <option value="N분">N분</option>
                            {[0, 15, 30, 45].map(minute => (
                                <option key={minute} value={minute}>{minute}분</option>
                            ))}
                        </Select>
                    </div>
                    <Label>이벤트 이름:</Label>
                    <Select value={eventName} onChange={(e) => setEventName(e.target.value)}>
                        <option value="기념일">기념일</option>
                        <option value="회의">회의</option>
                        <option value="약속">약속</option>
                        {/* 필요한 다른 옵션 추가 */}
                    </Select>
                </InputContainer>
            )}
        </div>
    );
}

export default  SelectedDate;
