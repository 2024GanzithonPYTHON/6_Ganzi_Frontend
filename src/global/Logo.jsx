import React from "react";
import styled from "styled-components"; 
import '../index.css'; // 폰트
import './Logo.css';

const LogoFont= styled.div`
  font-family: ChangWonDanGam, sans-serif; /* 단감체 */
  font-size: 25px;
  color: black; 
`;
const Logo = () => {
    return (
        <div className="logo-wrapper">
            <LogoFont>FLAN</LogoFont>
        </div>
    );
};

export default Logo;