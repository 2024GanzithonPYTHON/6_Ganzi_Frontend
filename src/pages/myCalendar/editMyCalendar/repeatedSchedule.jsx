import React, { useState } from 'react';
import api from '../../../api/api'; // api.js에서 axios 인스턴스를 가져옵니다.

function RepeatedSchedule() {
    const [startHour, setStartHour] = useState('N시');
    const [startMinute, setStartMinute] = useState('N분');
    const [frequency, setFrequency] = useState('1'); // 기본값 1
    const [schedule, setSchedule] = useState('');
    const [accessToken, setAccessToken] = useState(''); // Access token을 저장할 상태

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    const handleSubmit = async () => {
        const inputScheduleDate = "2024-11-16"; // 예시 날짜
        const inputStartTime = `${startHour.replace('시', '')}:${startMinute.replace('분', '')}:00`;

        const requestBody = {
            input_schedule_date: inputScheduleDate,
            input_start_time: inputStartTime,
            input_end_time: "12:00:00", // 종료 시간 예시
            schedule_title: schedule,
            is_daily: frequency === '1',
            is_weekly: frequency === '7',
            is_monthly: frequency === '30',
            is_yearly: false // 필요한 경우 추가
        };

        try {
            const response = await api.post('/personal/repeated/register/', requestBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`, // Access token 추가
                    'Content-Type': 'application/json'
                }
            });

            console.log('성공:', response.data);
        } catch (error) {
            console.error('오류 발생:', error.response ? error.response.data : error.message);
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

            <button onClick={handleSubmit}>스케줄 등록</button>
        </RepeatedScheduleContainer>
    );
}

export default RepeatedSchedule;
