import React, { useState } from 'react';
import styled from "styled-components";
import MemoContainer from './Memo';
import SaveButton from './SaveButton';
import TopBar from './TopBar';
import api from '../auth/axiosInstance'; // api 인스턴스 임포트
import axios from 'axios';

const Container = styled.div`
    position: sticky;  
    top: 0px;   // 로고 바로 아래로
    background-color: white;
`;

const ButtonContainer = styled.div`
    margin-top: 50px; 
`;

function MyMemo() {
    const [memos, setMemos] = useState([]);
    const [content, setContent] = useState(''); // 메모 내용 관리

    // 로컬스토리지에서 액세스 토큰 가져오기
    const userAccessToken = localStorage.getItem("access_token");

    const addMemo = (newMemo) => {
        setMemos([...memos, newMemo]);
    };

    const handleSave = async () => {
        if (content) {
            const newMemo = { content };
            addMemo(newMemo);

            // API 요청 보내기
            try {
                const response = await api.post('/personal/one-word/', { // api 인스턴스 사용
                    content: newMemo.content
                }, {
                    headers: {
                        'Authorization': `Bearer ${userAccessToken}` // 가져온 토큰 사용
                    }
                });

                if (response.data?.success) { // 응답이 success일 때
                    alert("저장되었습니다!"); // 성공 메시지
                } else {
                    alert("다시 시도해주세요."); // 실패 메시지
                }
                console.log('API 응답:', response.data); // 응답 확인
            } catch (error) {
                console.error('API 요청 오류:', error);
                alert("메모 저장 중 오류가 발생했습니다."); // 오류 메시지
            }

            setContent(''); // 내용 초기화
        } else {
            alert("내용을 입력해주세요");
        }
    };

    return (
        <div>
            <TopBar/>
            <Container>
                <div>
                    <MemoContainer 
                        onSave={addMemo} 
                        content={content} 
                        setContent={setContent} 
                    />
                    <ButtonContainer>
                        <SaveButton onClick={handleSave}>저장하기</SaveButton>
                    </ButtonContainer>
                </div>
            </Container>
        </div>
    );
}

export default MyMemo;
