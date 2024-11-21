import React, { useState } from 'react';
import styled from "styled-components";
import MemoContainer from './Memo';
import SaveButton from './SaveButton'; 
import TopBar from './TopBar';

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
    

    const addMemo = (newMemo) => {
        setMemos([...memos, newMemo]);
    };



    const handleSave = () => {
        if (content && title) {
            addMemo({ title, content });
            setContent('');
            setTitle('');
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