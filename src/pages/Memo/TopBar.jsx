// TopBar.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReturnButton from '/src/assets/Global/ReturnButton.svg'; // SVG 파일 임포트

const TopBarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    margin-top: 0px;
`;

const GobackButton = styled.button`
    background-color: white;
    border: none;
    cursor: pointer; // 커서 스타일 추가
`;

const ButtonImage = styled.img`
    width: 35px;
    height: auto;
`;

const TopBarText = styled.span`
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-weight: normal;
    flex-grow: 1;
    text-align: center;
`;


const TopBar = () => {
    const navigate = useNavigate(); // navigate 초기화
    const handleBack = () => {
        navigate('/'); // 홈으로 돌아가자~~~
    };
    return (
            <TopBarContainer>
                <GobackButton onClick={handleBack}>
                    <ButtonImage src={ReturnButton} alt="돌아가기" />
                </GobackButton>
                <TopBarText>메모 추가하기</TopBarText>
                <div style={{ width: '35px' }} /> {/* 오른쪽 여백을 위한 빈 div */}
            </TopBarContainer>
    );
};

export default TopBar;
