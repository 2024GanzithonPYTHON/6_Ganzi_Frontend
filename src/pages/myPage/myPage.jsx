import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/axiosClient";
import badgeMapping from "../../constants/badgeMapping";
import "./MyPage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    profile_img: "",
    nickname: "",
    email: "",
    badges: [],
    family: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get("/accounts/myprofile/");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post("/accounts/kakao/logout/");
      alert("로그아웃 되었습니다.");
      // 로그아웃 이후 원하는 행동 추가 (e.g., 홈으로 리다이렉트)
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <img
          src={profile.profile_img}
          alt={`${profile.nickname}의 프로필`}
          className="profile-img"
        />
        <h1>{profile.nickname}</h1>
        <p>{profile.email}</p>
        <Link to="/프로필수정" className="btn">프로필 수정하기</Link>
        <button onClick={handleLogout} className="btn logout-btn">로그아웃</button>
      </div>

      {/* 배지 섹션 */}
      <div className="badges-section">
        <h2>내가 획득한 배지</h2>
        <div className="badges-list">
            {profile.badges && profile.badges.map((badge, index) => {
            const badgeInfo = badgeMapping[badge.badge_name];
            return (
              <div key={index} className="badge">
                <img src={badgeInfo.img} alt={badge.badge_name} />
                <p>{badge.badge_name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 스케줄 섹션 */}
      <div className="schedule-section">
        <h2>스케줄 관리</h2>
        <Link to="/스케쥴관리하기" className="btn">스케쥴 관리하기</Link>
        <Link to="/받은스케쥴" className="btn">받은 스케쥴</Link>
        <Link to="/보낸스케쥴" className="btn">보낸 스케쥴</Link>
        <Link to="/거절한스케쥴" className="btn">거절한 스케쥴</Link>
        <Link to="/내캘린더확인하기" className="btn">내 캘린더 확인하기</Link>
      </div>

      {/* 가족 섹션 */}
      <div className="family-section">
        <h2>우리 가족</h2>
        <div className="family-list">
          {profile.family.map((member, index) => (
            <div key={index} className="family-member">
              <img src={member.profile_img} alt={member.nickname} />
              <p>{member.nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

/*
import React from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';
import logoutIcon from '../../assets/myPage/logout.png';
//import logoutIcon from '../../assets/myPage/ca.png';
//import logoutIcon from '../../assets/myPage/rightAngleBracket.png';



function MyPage() {
  return (
    <div className="my-page">
      <div className="profile-section">
        
        <div className="profile-image">프로필 이미지</div>
        <div className="profile-info">
          <h2 className="nickname">일이삼사오륙칠팔구십</h2>
          <Link to="/EditProfile" className="button-edit-profile">프로필 수정하기</Link>
          <button class="logout-button">
            <img src={logoutIcon} alt="Logout Icon" class="logout-icon" />
            <span class="logout-text">로그아웃</span>
          </button>
        </div>
      </div>

      
      <div className="badge-section">
        <div>내가 획득한 배지</div>
        <div className="badge-container">
          
        </div>
      </div>

      
      <div className="schedule-section">
        <h3>스케줄 관리하기</h3>
        <div className="schedule-links">
          <Link to="/received-schedule">받은 스케줄</Link>
          <Link to="/sent-schedule">보낸 스케줄</Link>
          <Link to="/rejected-schedule">거절한 스케줄</Link>
        </div>
        <Link to="/calendar" className="calendar-link">
          <div className="calendar-icon"></div>
          <span>내 캘린더 확인하기</span>
        </Link>
      </div>

      <div className="family-section">
        <h3>우리 가족</h3>
        <div className="family-members">
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
*/