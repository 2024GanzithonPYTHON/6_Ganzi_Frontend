
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import kakaoLoginBtn from '../../assets/login/kakao_login_medium_wide.png';


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
      <div className="login-container">
        <h1>로그인</h1>
        <button onClick={handleKakaoLogin} className="kakao-login-button">
          <img src={kakaoLoginBtn} alt="카카오 로그인 버튼" />
        </button>
      </div>
    );
  };
  
  export default Login;
