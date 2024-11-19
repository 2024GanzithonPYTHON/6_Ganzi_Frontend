import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyPage.css';
import logoutIcon from '../../assets/myPage/logout.png';

function MyPage() {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [badges, setBadges] = useState([]);
  const [family, setFamily] = useState([]);

  // API 호출
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('<백엔드배포주소>/accounts/myprofile/', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + '유저의 access token 값',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNickname(data.nickname);
          setProfileImage(data.profile_img);
          setBadges(data.badges);
          setFamily(data.family);
        } else {
          console.error('프로필 데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('네트워크 오류:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="my-page">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <div className="profile-image">
          <img
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="프로필 이미지"
            className="profile-img"
          />
        </div>
        <div className="profile-info">
          <h2 className="nickname">{nickname || '닉네임 불러오는 중...'}</h2>
          <Link to="/EditProfile" className="button-edit-profile">
            프로필 수정하기
          </Link>
          <button className="logout-button">
            <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
            <span className="logout-text">로그아웃</span>
          </button>
        </div>
      </div>

      {/* 내가 획득한 배지 섹션 */}
      <div className="badge-section">
        <h3>내가 획득한 배지</h3>
        <div className="badge-container">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <div key={index} className="badge-item">
                {badge.badge_name}
              </div>
            ))
          ) : (
            <p>획득한 배지가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 스케줄 관리 섹션 */}
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

      {/* 우리 가족 섹션 */}
      <div className="family-section">
        <h3>우리 가족</h3>
        <div className="family-members">
          {family.length > 0 ? (
            family.map((member, index) => (
              <div key={index} className="family-member">
                <img
                  src={member.profile_img || 'https://via.placeholder.com/100'}
                  alt={`${member.nickname}의 프로필`}
                  className="family-image"
                />
                <p>{member.nickname}</p>
              </div>
            ))
          ) : (
            <p>등록된 가족 구성원이 없습니다.</p>
          )}
          <Link to="/add-family" className="add-family">
            +
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;


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