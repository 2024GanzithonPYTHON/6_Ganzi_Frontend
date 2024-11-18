import React, { useState } from 'react';
/* import { useNavigate } from 'react-router-dom'; 리다이렉트 정해지면 활성화 */
import profileUpload from '../../assets/myPage/imageUploader.png';
import './Register.css'

function Register() {
  /* const navigate = useNavigate(); api 붙이면 리다이렉트 위치 정하고 쓰기 */
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
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
    setNickname(e.target.value);
  };

  const handleAgreementChange = (type) => {
    const updatedAgreements = {
      ...agreements,
      [type]: !agreements[type],
    };


    // Check if both requiredA and requiredB are true for enabling "all"
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
            placeholder="닉네임은 열 글자를 넘을 수 없습니다." 
            className="nickname-input"
            value={nickname}
            onChange={handleNicknameChange}
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
        <div className='must-notice'>*필수 약관 미동의, 정보 미등록 시 가입이 어렵습니다.</div>
        </div>
      </section>

      <button disabled={!isRegisterButtonEnabled} className='register-button'>프로필 등록하기</button>
    </div>
  );
}

export default Register;
