import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 
    background-color: #F6F6F6;
    border: 1px solid ${({ isChecked }) => (isChecked ? '#f0ad4e' : '#ccc')}; // 체크 상태에 따라 border 색상 변경
    border-radius: 10px;
    padding: 10px;
    transition: background-color 0.3s, border-color 0.3s; 

    &:hover {
        border-color: ${({ isChecked }) => (isChecked ? '#f0ad4e' : '#f0f0f0')}; 
    }
`;

const CheckButton = styled.button`
    width: 30px; 
    height: 30px; 
    border-radius: 50%; 
    background-color: ${({ isChecked }) => (isChecked ? '#F8D785' : 'transparent')}; 
    border: 2px solid ${({ isChecked }) => (isChecked ? 'white' : '#ccc')}; 
    color: white;
    cursor: pointer;
    margin-left: auto; 
    display: flex;
    align-items: center;
    justify-content: center; 

    &:focus {
        outline: none;
    }
`;
const Label = styled.label`
    margin-right: 10px; // 라벨과 체크 버튼 사이 여백
`;

const SpecialDay = () => {
    const [schedule, setSchedule] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // 체크 상태 추가

    const handleScheduleChange = (e) => {
        setSchedule(e.target.value);
    };

    const handleCheckClick = () => {
        setIsChecked(prev => !prev); // 체크 상태 토글
        console.log('Checked!');
    };

    return (
        <Container 
            isHovered={isHovered}
            isChecked={isChecked} // 체크 상태 전달
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <Label>기념일</Label>
            <CheckButton onClick={handleCheckClick} isChecked={isChecked}>✔️</CheckButton>
        </Container>
    );
};

export default SpecialDay;