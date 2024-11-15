import React from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';

function MyPage() {
  return (
    <div className="my-page">
      <div className="profile-section">
        {/* 프로필 이미지와 닉네임은 API가 완성되면 데이터를 불러와 사용 */}
        <div className="profile-image">프로필 이미지</div>
        <div className="profile-info">
          <h2 className="nickname">닉네임글자열자입니다</h2>
          <Link to="/EditProfile" className="button-edit-profile">프로필 수정하기</Link>
          <button className="logout-button">로그아웃</button>
        </div>
      </div>

      {/* 내가 획득한 배지 */}
      <div className="badge-section">
        <h3>내가 획득한 배지</h3>
        <div className="badge-container">
          {/* API를 통해 배지 정보를 받아와 각 배지 이미지와 이름을 표시 */}
          <div className="badge">얻은 배지1</div>
          <div className="badge">얻은 배지2</div>
          <div className="badge">얻은 배지3</div>
        </div>
      </div>

      {/* 스케줄 관리하기 */}
      <div className="schedule-section">
        <h3>스케줄 관리하기</h3>
        <div className="schedule-links">
          <Link to="/received-schedule">받은 스케줄</Link>
          <Link to="/sent-schedule">보낸 스케줄</Link>
          <Link to="/rejected-schedule">거절한 스케줄</Link>
        </div>
        <Link to="/calendar" className="calendar-link">
          <div className="calendar-icon">📅</div>
          <span>내 캘린더 확인하기</span>
        </Link>
      </div>

      {/* 우리 가족 */}
      <div className="family-section">
        <h3>우리 가족</h3>
        <div className="family-members">
          {/* API를 통해 가족 정보를 받아와 각 프로필 이미지와 이름을 표시 */}
          <div className="family-member">
            <div className="family-image">프로필1</div>
            <p>프로필명1</p>
          </div>
          <div className="family-member">
            <div className="family-image">프로필2</div>
            <p>프로필명2</p>
          </div>
          <div className="family-member">
            <div className="family-image">프로필3</div>
            <p>프로필명3</p>
          </div>
          <Link to="/add-family" className="add-family">+</Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;