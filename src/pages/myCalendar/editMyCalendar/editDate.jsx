import React, { useState } from "react";
import styled from 'styled-components';
import SelectedDate from "./selectedDay";
import RepeatedSchedule from "./repeatedSchedule";

const EditDateContainer = styled.div`
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

const ToggleButtonContainer = styled.div`
    display: flex;
    position: relative;
    width: 285px;
    height: 42px;
    margin-bottom: 10px;
    background-color: #F8D785;
    border-radius: 20px; 
    overflow: hidden; // 버튼이 컨테이너를 넘어가지 않도록 설정
`;

const ToggleButton = styled.button`
    flex: 1; // 버튼이 동일한 너비로 늘어나도록 설정
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
    
    width: 128px; // 인디케이터의 크기
    height: 30px; 
    background-color: white; 
    border-radius: 20px; 
    transition: left 0.3s;
`;

const ScheduleInput = styled.textarea`
    width: 100%;
    height: 100px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
`;

function EditDate() {
    const [isRecurring, setIsRecurring] = useState(false); // 반복 일정 여부
    const [schedule, setSchedule] = useState(''); // 스케줄 내용

    const handleScheduleChange = (event) => {
        setSchedule(event.target.value);
    };

    return (
        <EditDateContainer>
            <ToggleButtonContainer>
                <Indicator active={isRecurring} />
                <ToggleButton active={!isRecurring} onClick={() => setIsRecurring(false)}>
                    지정된 날짜
                </ToggleButton>
                <ToggleButton active={isRecurring} onClick={() => setIsRecurring(true)}>
                    반복되는 일정
                </ToggleButton>
            </ToggleButtonContainer>

            {isRecurring ? (
                <div>
                    <RepeatedSchedule/>
                </div>
            ) : (
                <div>
                    <SelectedDate/>
                </div>
            )}
        </EditDateContainer>
    );
}

export default EditDate;
