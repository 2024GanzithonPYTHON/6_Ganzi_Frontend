import React, { useState } from 'react';
import styled from "styled-components";
import MemoContainer from './Memo';
import SaveButton from './SaveButton'; 
import TopBar from './TopBar';

import api from '../../api/api';

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
    const [title, setTitle] = useState(''); // 메모 제목 관리
    const accessToken = 'YOUR_ACCESS_TOKEN'; // 여기에 실제 access token을 입력하세요

    const addMemo = (newMemo) => {
        setMemos([...memos, newMemo]);
    };

    const handleSave = async () => {
        if (content && title) {
            const newMemo = { title, content };

            try {
                const response = await api.post('/personal/one-word/', newMemo, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                // 서버에서 응답받은 데이터를 메모에 추가
                addMemo(response.data); 
                setContent('');
                setTitle('');
            } catch (error) {
                console.error("메모 저장 실패:", error);
                alert("메모 저장에 실패했습니다.");
            }
        } else {
            alert("제목과 내용을 입력해주세요");
        }
    };

    return (
        <div>
            <TopBar/>
            <Container>
                <div>
                    <MemoContainer 
                        onSave={addMemo} 
                        title={title} 
                        setTitle={setTitle} 
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