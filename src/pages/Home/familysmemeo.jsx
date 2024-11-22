import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from '../../api/api'; 

const Container = styled.div`
    background-color: rgba(243, 243, 243, 0.60);
    border-radius: 15px; 
    padding: 20px; /* 내부 여백 */
    width: 300px; 
`;

const MemoItem = styled.div`
    display: flex;
    align-items: flex-start; /* 세로 정렬 */
    margin: 10px 0; /* 항목 간 여백 */
`;

const ProfileImage = styled.img`
    width: 40px; /* 프로필 이미지 너비 */
    height: 40px; /* 프로필 이미지 높이 */
    border-radius: 50%; /* 둥글게 */
    margin-right: 10px; /* 이미지와 내용 간 여백 */
`;

const ContentText = styled.span`
    font-size: 16px;
    color: #000;
`;

const Button = styled.button`
    background-color:transparent;
    border: none; 
    color: #000; 
    font-size: 13px;
    cursor: pointer; 
    margin-top: 10px; 
    border-bottom: 0.5px solid #000;
`;

const ButtonContainer = styled.div`
    display: flex; /* 플렉스 박스 사용 */
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-top: 10px; /* 버튼 위 여백 */
`;
function FamilysMemo() {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFamMessages = async () => {
            const token = localStorage.getItem("access_token"); // 로컬스토리지에서 액세스 토큰 가져오기
            if (!token) {
                console.error("Access token not found");
                return;
            }

            try {
                const response = await api.get('/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const famMessages = response.data.fam_message.members || []; // fam_message.members에서 메시지 추출
                setMessages(famMessages); // 상태 업데이트
            } catch (error) {
                console.error('Failed to fetch family messages:', error);
            }
        };

        fetchFamMessages();
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    const handleAddMemo = () => {
        navigate('/MyMemo'); // /MyMemo로 이동
    };

    // 최신 메모 하나만 선택
    const latestMessage = messages[messages.length - 1]; // 배열의 마지막 요소 선택

    return (
        <div>
            <Container>
                {latestMessage && ( // 최신 메시지가 존재할 경우에만 렌더링
                    <MemoItem>
                        <ProfileImage src={latestMessage.profile_img} alt="Profile" />
                        <ContentText>{latestMessage.content}</ContentText>
                    </MemoItem>
                )}
            </Container>
            <ButtonContainer>
                <Button onClick={handleAddMemo}>+ 나의 메모 남기기</Button>
            </ButtonContainer>
        </div>
    );
}

export default FamilysMemo;