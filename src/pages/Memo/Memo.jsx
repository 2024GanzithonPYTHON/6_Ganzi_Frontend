import React, { useState } from 'react';
import styled from 'styled-components';

const MemoBox = styled.textarea`
    width: 319px;
    height: 117px;
    flex-shrink: 0;
    border-radius: 10px; 
    background: #F6F6F6;
    padding: 20px;
    resize: none; 
    border: none;
    box-shadow: none; 
    outline: none; 

    &::placeholder {
        color: #aaa; 
    }
`;

const CharCount = styled.span`
    font-size: 12px;
    color: #aaa; 
    position: absolute; 
    bottom: 10px; 
    right: 10px; 
`;

function MemoContainer({content, setContent }) {
    const handleChangeContent = (e) => {
        const value = e.target.value;
        if (value.length <= 50) { 
            setContent(value);
        }
    };

    return (
        <div className="memo-container" style={{ position: 'relative' }}>
            <MemoBox
                placeholder="텍스트를 입력하세요" 
                value={content} 
                onChange={handleChangeContent} 
            />
            <CharCount>{content.length}/50</CharCount> 
        </div>
    );
}

export default MemoContainer;
