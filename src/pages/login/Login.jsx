import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import kakaoLoginBtn from '../../assets/login/kakao_button.png';
import onbordIcon from '../../assets/login/onboardingIcon.png';
import downIcon from '../../assets/login/Expand_down_double_light.png';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const redirectUrl = "http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/accounts/kakao/login/";
    window.location.href = redirectUrl; // 외부 URL 이동은 여전히 window.location.href
  };

  useEffect(() => {
    const fetchLoginResponse = async () => {
      try {
        // 백엔드가 JSON 응답을 반환한다고 가정
        const response = await axios.get("http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/", {//백에서 클라이언트에 전달하는 엔드포인트(확인해봐야됨)
          //withCredentials: true, // 쿠키가 필요하다면 설정
        });

        console.log("응답 데이터:", response.data);

        const { message, access_token, refresh_token } = response.data;

        if (access_token && refresh_token) {
          // 토큰 저장
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // message에 따라 라우팅
          if (message === "User created and logged in") {
            navigate("/Register");
          } else if (message === "Login successful") {
            navigate("/MyPage");
          }
        }
      } catch (error) {
        console.error("로그인 응답 처리 중 오류 발생:", error);
      }
    };

    fetchLoginResponse(); // 로그인 결과 처리 함수 호출
  }, [navigate]);

  
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
