import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import HandleKakaoCallback from "./HandleKakaoCallback"; // 콜백 함수 import
import "./Login.css";
import kakaoLoginBtn from '../../assets/login/kakao_button.png';
import onbordIcon from '../../assets/login/onboardingIcon.png';
import downIcon from '../../assets/login/Expand_down_double_light.png';
import axiosInstance from "../auth/axiosInstance"; // axiosInstance import


const Login = () => {
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleKakaoLogin = async () => {
    try {
      const response = await axiosInstance.get(`/accounts/kakao/login/`);

      if (response.data.kakaoURL) {
        // 백엔드에서 받은 카카오 로그인 URL로 리다이렉트
        window.location.href = response.data.kakaoURL;
      } else {
        throw new Error("Invalid Kakao login URL");
      }
    } catch (err) {
      console.error("Error during Kakao login:", err);
      setError("카카오 로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 카카오 콜백 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const processCallback = async () => {
        try {
          const tokens = await handleKakaoCallback(code); // handleKakaoCallback 호출
          if (tokens.access_token && tokens.refresh_token) {
            // JWT 토큰 저장
            setCookie("accessToken", tokens.access_token, { path: "/" });
            setCookie("refreshToken", tokens.refresh_token, { path: "/" });

            console.log("Tokens saved:", tokens);

            // MyPage로 이동
            navigate("/MyPage");
          } else {
            throw new Error("Tokens not received from server");
          }
        } catch (err) {
          console.error("Error handling callback response:", err);
          setError("로그인 처리를 완료하지 못했습니다. 다시 시도해주세요.");
        }
      };

      processCallback();
    }
  }, [navigate, setCookie]);


  const putToken = () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0ODgwMDM0LCJpYXQiOjE3MzIyODgwMzQsImp0aSI6IjlkYWExZTM5ZTVhYjQzODJhZDRjNjA1YWU0Zjc1MDE3IiwidXNlcl9pZCI6MjN9.lq8WbGcPp9CEvPu7yOA29cULwy9FemACdY6ai0Om9n4";
    localStorage.setItem('access_token',accessToken);
  }
  
    return (
      <div className="background">
        <div className="logo-explain">요즘 가족, 일정 관리 서비스</div>
        <div className="login-logo">FLAN</div>
        <img src={onbordIcon} alt="온보딩 페이지 아이콘" className="onboardIcon1"></img>
        <div className="explain">지금 <span className="bold">FLAN</span>과 함께<br/>
        <span className="bold">개인 일정</span>이 반영되는 <span className="bold">가족 일정</span> 관리를<br/>
        경험해 보세요!</div>
        <img src={downIcon} alt="온보딩 페이지 아이콘" className="onboardIcon2"></img>
        <button onClick={putToken}>ss</button>
        <button onClick={handleKakaoLogin} className="kakao-login-button">
          <img src={kakaoLoginBtn} alt="카카오 로그인 버튼" />
        </button>
      </div>
    );
};

export default Login;
