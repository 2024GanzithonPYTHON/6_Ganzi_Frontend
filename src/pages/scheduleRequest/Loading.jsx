import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router를 사용하는 경우
import './Loading.css';

// 로딩 페이지 컴포넌트
const Loading = () => {
  const navigate = useNavigate(); // 리다이렉트에 사용할 navigate 함수

  return (
    <div className="loading-page">
      <div className="loading-content">
        <p className='loading-message'>일정이 가능한<br/>가족구성원을 찾고 있어요 :)</p>
        <div className="image-placeholder"></div>
      </div>
    </div>
  );
};

export default Loading;