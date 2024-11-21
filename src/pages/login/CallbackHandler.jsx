import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (!code || error) {
      navigate('/login'); // 로그인 페이지로 리디렉션
      return;
    }

    const fetchKakaoToken = async () => {
      try {
        const response = await fetch('http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/accounts/kakao/callback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }), // 인증 코드 전송
        });

        const data = await response.json();

        if (response.ok) {
          const { accessToken, refreshToken, message } = data;

          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // message 값에 따라 리디렉션 처리
          if (message === "User created and logged in") {
            navigate('/register'); // 신규 유저 -> 회원가입 페이지로 이동
          } else if (message === "Login successful") {
            navigate('/MyPage'); // 기존 유저 -> 메인 페이지로 이동
          } else {
            console.error('Unexpected message:', message);
            navigate('/login'); // 알 수 없는 메시지 -> 로그인 페이지로 이동
          }
        } else {
          console.error('Login failed:', data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during login:', error);
        navigate('/login');
      }
    };

    fetchKakaoToken();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;

