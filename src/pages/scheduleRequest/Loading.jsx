import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용하는 경우
import './Loading.css';

// 로딩 페이지 컴포넌트
const Loading = ({ duration = 3000, redirectTo = "/" }) => {
  const navigate = useNavigate(); // 리다이렉트에 사용할 navigate 함수

  useEffect(() => {
    // 지정된 시간이 지나면 redirectTo로 이동
    const timer = setTimeout(() => {
      navigate(redirectTo);
    }, duration);

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearTimeout(timer);
  }, [duration, navigate, redirectTo]);

  return (
    <div className="loading-page">
      <div className="loading-content">
        <p>일정이 가능한 가족구성원을 찾고 있어요 :)</p>
        <div className="image-placeholder"></div>
      </div>
    </div>
  );
};

export default Loading;