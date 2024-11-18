import React from "react";
import styled from "styled-components"; 
import '../index.css'; // 폰트
import './Logo.css';

/* 창원단감서체 로고 스타일 */
const LogoFont= styled.div`
  font-family: ChangWonDanGam, sans-serif; /* 방금 추가한 폰트 사용 */
  font-size: 2rem; /* 원하는 폰트 크기로 조정 */
  color: black; /* 로고 색상 */
`;
const Logo = () => {
    return (
        <div className="logo-wrapper">
            <LogoFont>FLAN</LogoFont>
        </div>
    );
};

export default Logo;