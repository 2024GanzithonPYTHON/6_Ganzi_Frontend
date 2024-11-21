import React from "react";
import "./Login.css";
import kakaoLoginBtn from '../../assets/login/kakao_button.png';
import onbordIcon from '../../assets/login/onboardingIcon.png';
import downIcon from '../../assets/login/Expand_down_double_light.png';

const Login = () => {

  const handleKakaoLogin = () => {
    const redirectUrl = "http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/accounts/kakao/login/";
    window.location.href = redirectUrl; // 외부 URL 이동은 여전히 window.location.href
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
