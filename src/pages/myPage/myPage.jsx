import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiClient from "../../api/axClient";
import "./MyPage.css";
import BadgeList from "../../badge/BadgeList";
import logoutImage from '../../assets/mypage/logout.png';
import rightWay from '../../assets/mypage/rightAngleBracket.png';
import calButton from '../../assets/mypage/calendarButton.png';
import FamilyList from './FamilyList'

const MyPage = () => {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/accounts/myprofile/");
        setProfile(response.data); // 프로필 데이터를 상태에 저장
    } catch (error) {
        console.error("API 요청 실패", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      // 로그아웃 요청
      await apiClient.post("/accounts/kakao/logout/"); // 로그아웃 엔드포인트로 POST 요청

      // 로컬 스토리지에서 토큰 삭제 (로그아웃 처리)
      localStorage.removeItem("access_token");
      navigate("/login");
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEditProfile = () => {
    navigate("/EditProfile"); // 프로필 수정 페이지로 리다이렉트
  };

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <img
          src={profile.profile_img}
          alt={`${profile.nickname}'s profile`}
          className="profile-img"
        />
        <div className="right-sec">
          <div className="nickname">{profile.nickname}</div>
          <div className="email">{profile.email}</div>
            <button className="edit-button" onClick={handleEditProfile}>
            프로필 수정하기
            </button>
          <button className="logout-button" onClick={handleLogout}>
            <img src={logoutImage} alt="Logout" className="logout-icon" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
      <div className="badges-section">
        <div className="badge-title">내가 획득한 배지</div>
        {profile.badges && profile.badges.length > 0 ? (
          <BadgeList badges={profile.badges} /> // 배지 목록 표시
        ) : (
          <p>획득한 배지가 없습니다.</p>
        )}
      </div>

        <div className="schedule-management">
         <div className="schedule-header">
            <div className="schedule-title">스케쥴 관리하기</div>
            <Link to="/받은스케쥴" className="received-schedule-button">
              <img src={rightWay} alt="받은 스케쥴" />
            </Link>
          </div>

          <div className="schedule-buttons">
         <Link to="/받은스케쥴" className="scheduled-button">받은 스케쥴</Link>
         <Link to="/보낸스케쥴" className="scheduled-button">보낸 스케쥴</Link>
         <Link to="/거절한스케쥴" className="scheduled-button">거절한 스케쥴</Link>
        </div>

          <div className="calendar-button">
            <Link to="/내캘린더" className="calendar-link">
            <img src={calButton} alt="캘린더" />
              <span>내 캘린더 확인하기</span>
          </Link>
          </div>
        </div>  
          <div>
            <div className="family-title">우리 가족</div>
            <FamilyList family={profile.family} />
          </div>
        <div className="back-rectangle"></div>
        <div className="badge-rectangle"></div>
    </div>
  );
};

export default MyPage;
