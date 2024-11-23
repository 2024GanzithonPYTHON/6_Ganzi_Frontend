import React, { useState } from "react";
import styled from 'styled-components';
import SpecialDay from "./specialDay";
import api from '../../auth/axiosInstance'; // API 호출을 위한 axios 인스턴스

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
    font-weight: 400;
`;

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
        color: black; 
        outline: none; 
    }

    option {
        background-color: #ffffff; 
        color: black; 
    }
`;

const StartTimeContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center; // 중앙 정렬 추가
    margin-bottom: 20px; 
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
    font-size: 14px;

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

const SaveButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #4CAF50; /* Green */
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

function SelectedDate({ date, onToggleEdit }) {
    const [isRecurring, setIsRecurring] = useState(false);
    const [schedule, setSchedule] = useState('');
    const [startHour, setStartHour] = useState('N시');
    const [startMinute, setStartMinute] = useState('N분');
    const [endHour, setEndHour] = useState('N시');
    const [endMinute, setEndMinute] = useState('N분');

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = async () => {
        // 시간 변환
        const formattedStartHour = startHour === 'N시' ? '00' : String(startHour).padStart(2, '0');
        const formattedStartMinute = startMinute === 'N분' ? '00' : String(startMinute).padStart(2, '0');
        const formattedEndHour = endHour === 'N시' ? '00' : String(endHour).padStart(2, '0');
        const formattedEndMinute = endMinute === 'N분' ? '00' : String(endMinute).padStart(2, '0');

        const startTime = `${formattedStartHour}:${formattedStartMinute}:00`; // 시작 시간 포맷
        const endTime = `${formattedEndHour}:${formattedEndMinute}:00`; // 종료 시간 포맷

        const requestBody = {
            input_schedule_date: formatDate(date), // 선택된 날짜 포맷 변환
            input_start_time: startTime,
            input_end_time: endTime,
            schedule_title: schedule,
            is_daily: false, // 모두 false로 설정
            is_weekly: false,
            is_monthly: false,
            is_yearly: false
        };

        try {
            const response = await api.post('/personal/my-schedule/', requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('스케줄 저장 성공:', response.data);
            // 추가적인 처리 (예: 알림, 리셋 등)
        } catch (error) {
            console.error('스케줄 저장 오류:', error.response?.data || error.message);
        }
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

                    <SpecialDay/>

                    <SaveButton onClick={handleSave}>저장하기</SaveButton> {/* 저장하기 버튼 추가 */}
                </InputContainer>
            )}
        </div>
    );
}

export default SelectedDate;
