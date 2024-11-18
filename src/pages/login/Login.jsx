import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import kakaoLoginBtn from '../../assets/login/kakao_button.png';
import onbordIcon from '../../assets/login/onboardingIcon.png';
import downIcon from '../../assets/login/Expand_down_double_light.png';

const Login = () => {
    const navigate = useNavigate();
  
    const handleKakaoLogin = async () => {
      try {
        const response = await fetch("<백엔드배포주소>/accounts/kakao/login/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to login");
        }
  
        const data = await response.json();
        if (data.access_token && data.refresh_token) {
          // 토큰을 로컬스토리지에 저장
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          navigate("/메인페이지 주소"); // 성공 시 리다이렉트
        } else {
          alert("로그인에 실패했습니다.");
          navigate("/Login"); // 실패 시 리다이렉트
        }
      } catch (error) {
        console.error("Error during Kakao login:", error);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/Login"); // 실패 시 리다이렉트
      }
    };
  
    return (
      <div className="background">
        <div className="logo-explain">요즘 가족, 일정 관리 서비스</div>
        <div className="login-logo">FLAN</div>
        <img src={onbordIcon} alt="온보딩 페이지 아이콘" className="onboardIcon1"></img>
        <div className="explain">지금 <span className="bold">FLAN</span>과 함께<br/>
        <span className="bold">개인 일정</span>이 반영되는 <span className="bold">가족 일정</span> 관리를<br/>
        경험해 보세요!</div>
        <img src={downIcon} alt="온보딩 페이지 아이콘" className="onboardIcon2"></img>
        <button onClick={handleKakaoLogin} className="kakao-login-button">
          <img src={kakaoLoginBtn} alt="카카오 로그인 버튼" />
        </button>
      </div>
    );
};

export default Login;
