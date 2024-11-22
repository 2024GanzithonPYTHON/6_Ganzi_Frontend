import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

const AddButton = styled.button`
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
    letter-spacing: -0.154px;
    background: none;
    border: none;
    cursor: pointer; 
    border-bottom: 1px solid #000; /* 아래쪽에만 경계 추가 */
    padding-bottom: 1px; /* 텍스트와 경계 사이의 간격 조정 */
`;

function NewAddButton(){
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate('/EditMyCalendar'); // 페이지 만들면 이동설정
    };

    return(
        <div>
        <AddButton onClick = {handleClick}>+ 새로운 스케줄 추가하기</AddButton>
        </div>

    )
}

export default NewAddButton;