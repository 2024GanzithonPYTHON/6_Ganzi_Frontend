import React, { useState } from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const StartButton = styled.div`
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    width: 59px;
    height: 35px;
    border-radius: 10px;
    background: #FF8581;
`;

const ButtonText = styled.p`
    color: #FFF;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    `

const EndButton = styled.div`
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center;
    align-items: center;

    width: 59px;
    height: 35px;
    margin-right: 10px;
    border-radius: 10px;
    background: #7695FF;
`;


const Select = styled.select`
    padding: 10px;
    margin-right: 10px; 
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #e0e0e0;
    color: #666; 

    &:focus {
        background-color: #ffffff; 
        color: black; // 
        outline: none; // 
    }

    option {
        background-color:  #ffffff; 
        color: black; 
    }
`;
const StartTimeContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center; // 중앙 정렬 추가
    margin-bottom: 20px; 
    position: relative;
`;

const ScheduleInput = styled.div`
    position: relative; // 자식 요소의 절대 위치를 위한 상대 위치
`;

const InputField = styled.textarea`
    width: 313px;
    height: 25px;
    margin-top: 20px;
    border-radius: 10px;
    border: 0.5px solid #ccc;
    padding-top: 10px;
    padding-left: 20px; 
    padding-right: 40px; // CharCount 공간 확보
    resize: none; 
    font-size: 14px; // 텍스트 크기 조정

    &::placeholder {
        color: #999; 
        text-align: left; 
    }
`;

const CharCount = styled.div`
    color: #ccc; 
    position: absolute; 
    font-size: 13px; 
    right: 15px; 
    bottom: 15px;
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
                    <StartTimeContainer>
                        <StartButton>
                            <ButtonText>시작</ButtonText>
                        </StartButton>
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
                    </StartTimeContainer>

                    <StartTimeContainer>
                    <EndButton><ButtonText>종료</ButtonText></EndButton>
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
                    </StartTimeContainer>
                    
                    <StartTimeContainer>
                        <ScheduleInput>
                            <InputField 
                                value={schedule} 
                                onChange={handleScheduleChange} 
                                placeholder="스케줄명을 입력해 주세요." 
                            />
                            <CharCount>{schedule.length}/15</CharCount>
                        </ScheduleInput>
                    </StartTimeContainer>
                    

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
