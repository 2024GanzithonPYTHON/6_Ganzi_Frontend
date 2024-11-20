import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileUpload from '../../assets/myPage/imageUploader.png';
import './Register.css'
import apiClient from '../../api/axiosClient';

function Register() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [agreements, setAgreements] = useState({
    all: false,
    requiredA: false,
    requiredB: false,
    optionalC: false,
  });
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (e) => {
    const input = e.target.value;

  // 입력값이 10자 이하일 때만 상태 업데이트
    if (input.length <= 10) {
     setNickname(input);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    
  };

  const handleAgreementChange = (type) => {
    const updatedAgreements = {
      ...agreements,
      [type]: !agreements[type],
    };

    if (type === 'all') {
      updatedAgreements.requiredA = !agreements.all;
      updatedAgreements.requiredB = !agreements.all;
      updatedAgreements.optionalC = !agreements.all;
      updatedAgreements.all = !agreements.all;
    } else {
      updatedAgreements.all = 
        updatedAgreements.requiredA && updatedAgreements.requiredB && updatedAgreements.optionalC;
    }

    setAgreements(updatedAgreements);
  };

  const handleSubmit = async () => {
    try {
      // 데이터 준비
      const profileData = {
        nickname,
        profile_img: profileImage, // 이미지 업로드된 파일의 URL 혹은 이미지 데이터
        profile_agreement: agreements.requiredA && agreements.requiredB, // 필수 약관이 동의된 경우만 true
        invited_user: email,
      };

      const response = await apiClient.patch('/account/profile/', profileData);

      if (response.status === 200) {
        console.log('프로필 업데이트 성공:', response.data);
        navigate('/메인페이지'); // 프로필 등록 성공 후 이동할 페이지
      } else {
        console.error('프로필 업데이트 실패:', response.data);
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
    }
  };

  const isRegisterButtonEnabled = profileImage && agreements.requiredA && agreements.requiredB;

  return (
    <div>
      <div className='register-title'>프로필 등록하기</div>

      <section>
        <div className='img-upload-container'>
        {/* 프로필 이미지 업로드 버튼 */}
        <div className='img-upload-title'>프로필 이미지 등록하기</div>
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
      </section>

      <section>
        <div className='nickEditContainer'>
          <div className='nickTitle'>닉네임</div>
          <input
            type="text"
            placeholder="e.g 귀여운 막내" 
            className="nickname-input"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
      </section>

      <section>
        <div className='emailContainer'>
          <div className='emailTitle'>초대한 가족 이메일 입력하기</div>
          <div className='emailTitle-explain'>이메일을 통해 가족 캘린더에 참여합니다.</div>
          <input
            type="text"
            placeholder="초대한 가족 이메일 주소를 입력해 주세요." 
            className="email-input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </section>

      <section>
        <div className='agreeContainer'>
        <div className='agreements-title'>약관</div>
        <div className='agreements-border'>
          <label className='all-agree'>
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={() => handleAgreementChange('all')}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;전체 동의하기
          </label>
          <label className='single-agree'>
            <input
              type="checkbox"
              checked={agreements.requiredA}
              onChange={() => handleAgreementChange('requiredA')}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;(필수) 개인회원 약관에 동의
          </label>
          <label className='single-agree'>
            <input
              type="checkbox"
              checked={agreements.requiredB}
              onChange={() => handleAgreementChange('requiredB')}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;(필수) 개인정보 수집 및 이용에 동의
          </label>
          <label className='single-agree'>
            <input
              type="checkbox"
              checked={agreements.optionalC}
              onChange={() => handleAgreementChange('optionalC')}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;(선택) 이메일 등 마케팅 정보 수신 동의
          </label>
        </div>
        <div className='must-notice'>*&nbsp;&nbsp;필수 약관 미동의, 정보 미등록 시 가입이 어렵습니다.</div>
        <div className='must-notice2'>**초대한 가족 이메일 미입력 시 단독으로 가정을 구성합니다. </div>
        </div>
      </section>

      <button disabled={!isRegisterButtonEnabled} className='register-button' onClick={handleSubmit}>프로필 등록하기</button>
    </div>
  );
}

export default Register;
