import React, { useState } from "react";
import styled from 'styled-components';
import api from "../../auth/axiosInstance";

const RepeatedScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const ScheduleInput = styled.div`
    position: relative; // 자식 요소의 절대 위치를 위한 상대 위치
`;

const InputField = styled.textarea`
    width: 303px;
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
const StartTimeContainer = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;   
    margin-bottom: 20px;
`;

const Label = styled.span`
    margin-bottom: 5px;
    font-weight: normal;
    color: #FF4D4D;  // 빨간색
`;

const BlackLabel = styled.span`
    margin-bottom: 5px;
    font-weight: normal;
    color: black;
`;

const SelectContainer = styled.div`
    display: flex;
    margin-bottom: 30px;
    
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
    width: 85px;
    height: 88px;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 20px;
    margin: 0 5px;
    background-color: ${props => (props.active ? '#F8D785' : '#fff')};
    color: black;
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

const Month = styled.p`
    font-size: 30px;
    margin:0px;
    padding-bottom:5px;
`;

const TermText = styled.p`
    font-size: 12px;
    margin: 0;          // 기본 여백 제거
`;

function RepeatedSchedule() {
    const [startHour, setStartHour] = useState('N시');
    const [startMinute, setStartMinute] = useState('N분');
    const [frequency, setFrequency] = useState('1'); // 기본값 1
    const [schedule, setSchedule] = useState('');
    const [scheduleDate, setScheduleDate] = useState('2024-11-16'); // 예시 날짜
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token")); // access token

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    const handleSubmit = async () => {
        const startTime = `${startHour}:${startMinute}:00`; // 시작 시간 포맷
        const endTime = `${startHour}:${parseInt(startMinute) + 2}:00`; // 종료 시간 예시로 2시간 후
        const isDaily = frequency === '1';
        const isWeekly = frequency === '7';
        const isMonthly = frequency === '30';

        const requestBody = {
            input_schedule_date: scheduleDate,
            input_start_time: startTime,
            input_end_time: endTime,
            schedule_title: schedule,
            is_daily: isDaily,
            is_weekly: isWeekly,
            is_monthly: isMonthly,
            is_yearly: false // 연간 스케줄은 예시로 false로 설정
        };

        try {
            const response = await api.post('/personal/my-schedule/', requestBody, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('스케줄 등록 성공:', response.data);
            // 성공적으로 스케줄이 등록된 후에 추가적인 처리 (예: 알림, 리셋 등)
        } catch (error) {
            console.error('스케줄 등록 오류:', error.response?.data || error.message);
            // 오류 처리
        }
    };

    return (
        <RepeatedScheduleContainer>
            <StartTimeContainer>
                <Label>시작하는 날짜</Label>
                <BlackLabel>가 언제인가요?</BlackLabel>
            </StartTimeContainer>
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
            
            <StartTimeContainer>
                <Label>스케줄의 주기</Label><BlackLabel>를 선택해 주세요.</BlackLabel>
            </StartTimeContainer>
            
            <FrequencyContainer>
                <FrequencyButton active={frequency === '1'} onClick={() => setFrequency('1')}>
                    <Month>1</Month>
                    <TermText>데일리</TermText>
                </FrequencyButton>
                <FrequencyButton active={frequency === '7'} onClick={() => setFrequency('7')}>
                    <Month>7</Month>
                    <TermText>위클리</TermText>
                </FrequencyButton>
                <FrequencyButton active={frequency === '30'} onClick={() => setFrequency('30')}>
                    <Month>30</Month>
                    <TermText>먼슬리</TermText> 
                </FrequencyButton>
            </FrequencyContainer>

            <ScheduleInput>
                <InputField 
                    value={schedule} 
                    onChange={handleScheduleChange} 
                    placeholder="스케줄명을 입력해 주세요." 
                />
                <CharCount>{schedule.length}/15</CharCount>
            </ScheduleInput>

            <button onClick={handleSubmit}>스케줄 등록</button> {/* 제출 버튼 추가 */}
        </RepeatedScheduleContainer>
    );
}

export default RepeatedSchedule;