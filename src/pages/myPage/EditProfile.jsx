import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import backButton from '../../assets/myPage/leftAngleBracket.png';
import profileUpload from '../../assets/myPage/imageUploader.png';

// BackButton 컴포넌트 정의
const BackButton = ({ onClick }) => {
  return (
    <button className="back-button" onClick={onClick}>
      <img src={backButton} alt="뒤로가기 버튼" className="back-icon" />
    </button>
  );
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const handleNavigation = () => {
    navigate('/MyPage'); // 이동하려는 페이지 경로
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-edit-container">
      {/* 프로필 수정 제목 */}
      <h1 className="title">프로필 수정</h1>
      
      {/* 뒤로가기 버튼 */}
      <BackButton onClick={handleNavigation} />

      <div className='upload-container'>
        {/* 프로필 이미지 업로드 버튼 */}
        <div className='uplodeTitle'>프로필 이미지 등록하기</div>
        <label htmlFor="profileImageUpload" className="image-upload-label">
          <img
            src={profileImage || profileUpload}
            alt="프로필 이미지"
            className="upload-button-image"
          />
        </label>
        <input
          type="file"
          id="profileImageUpload"
          className="file-input"
          onChange={handleImageUpload}
        />
      </div>

      <div className='nickEditContainer'>
        {/* 닉네임 입력 */}
        <div className='nickTitle'>닉네임</div>
        <input type="text" placeholder="영한 열자 제한" className="nickname-input" />
      </div>
      
      {/* 회원 탈퇴하기 버튼 */}
      <button className="delete-button">회원 탈퇴하기</button>

      {/* 저장하기 버튼 */}
      <button className="save-button">저장하기</button>
    </div>
  );
};

export default ProfileEdit;
