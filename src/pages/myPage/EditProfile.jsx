import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axClient';
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
  const [nickname, setNickname] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  

  useEffect(() => {
    // 프로필 정보 불러오기
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/accounts/myprofile/edit/');
        const { user_id, nickname, profile_img } = response.data;

        setUserId(user_id);
        setNickname(nickname);
        setProfileImage(profile_img);
      } catch (error) {
        console.error('프로필 정보를 불러오는 중 에러 발생:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleNavigation = () => {
    navigate('/MyPage'); // 이동하려는 페이지 경로
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 미리보기 이미지 업데이트
      setUploadedFile(file); // 업로드된 파일 저장
    }
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('nickname', nickname); // 닉네임 추가
    if (uploadedFile) {
      formData.append('profile_img', uploadedFile); // 파일 추가
    }

    try {
      const response = await axios.patch('/accounts/myprofile/edit/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 필요
        },
      });
      console.log('프로필 수정 성공:', response.data);
      alert('프로필이 성공적으로 수정되었습니다.');
      navigate('/MyPage'); // 수정 완료 후 마이페이지로 이동
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
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
        <input type="text" value={nickname} placeholder="영한 열자 제한" className="nickname-input" onChange={handleNicknameChange} />
      </div>
      
      {/* 회원 탈퇴하기 버튼 */}
      <button className="delete-button">회원 탈퇴하기</button>

      {/* 저장하기 버튼 */}
      <button className="save-button" onClick={handleSave}>저장하기</button>
    </div>
  );
};

export default ProfileEdit;
