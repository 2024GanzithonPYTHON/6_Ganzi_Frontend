import React, { useState } from "react";
import styled from 'styled-components';

const EditDateContainer = styled.div`
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    height: 100vh; // 100% 화면 높이
`;

const ToggleButtonContainer = styled.div`
    display: flex;
    position: relative; // 상대 위치 설정
    width: 285px;
    height: 42px;
    margin-bottom: 10px;
    background-color: #F8D785;
    border-radius: 20px; // 컨테이너의 모서리 둥글게
    overflow: hidden; // 버튼이 컨테이너를 넘어가지 않도록 설정
`;

const ToggleButton = styled.button`
    flex: 1; // 버튼이 동일한 너비로 늘어나도록 설정
    padding: 5px;
    color: black;
    border: none;
    border-radius: 0; // 버튼의 모서리는 둥글지 않게
    cursor: pointer;
    background-color: transparent; // 기본 배경색 투명
    transition: background-color 0.3s; // 배경색 전환 애니메이션
    display: flex; // Flexbox 사용
    align-items: center; // 수직 가운데 정렬
    justify-content: center; // 수평 가운데 정렬
    position: relative; // 버튼의 상대 위치 설정
`;

const Indicator = styled.div`
    position: absolute;
    top: 50%;
    left: ${props => (props.active ? '75%' : '25%')}; // 상태에 따라 위치 조정
    transform: translate(-50%, -50%); // 세로 중앙 정렬 및 수평 중앙 조정
    width: 128px; // 인디케이터의 크기
    height: 30px; // 버튼의 높이와 같게
    background-color: white; // 인디케이터의 색상
    border-radius: 20px; // 모서리 둥글게
    transition: left 0.3s; // 위치 이동 애니메이션
`;

function EditDate() {
    const [isRecurring, setIsRecurring] = useState(false); // 반복 일정 여부

    return (
        <EditDateContainer>
            <ToggleButtonContainer>
                <Indicator active={isRecurring} />
                <ToggleButton active={!isRecurring} onClick={() => setIsRecurring(false)}>
                    지정된 날짜
                </ToggleButton>
                <ToggleButton active={isRecurring} onClick={() => setIsRecurring(true)}>
                    반복 일정
                </ToggleButton>
            </ToggleButtonContainer>
        </EditDateContainer>
    );
}

export default EditDate;
