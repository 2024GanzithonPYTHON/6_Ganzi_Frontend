import React, { useState } from 'react';

function Register() {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const [agreements, setAgreements] = useState({
    all: false,
    requiredA: false,
    requiredB: false,
    optionalC: false,
  });

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
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
      <h1>프로필 등록하기</h1>

      <section>
        <h2>프로필 이미지 등록하기</h2>
        <input type="file" onChange={handleImageUpload} />
      </section>

      <section>
        <h3>닉네임</h3>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={handleNicknameChange}
        />
      </section>

      <section>
        <h3>약관</h3>
        <div style={{ border: '1px solid black', padding: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={() => handleAgreementChange('all')}
            />
            전체 동의하기
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={agreements.requiredA}
              onChange={() => handleAgreementChange('requiredA')}
            />
            (필수) 개인회원 약관에 동의
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={agreements.requiredB}
              onChange={() => handleAgreementChange('requiredB')}
            />
            (필수) 개인정보 수집 및 이용에 동의
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={agreements.optionalC}
              onChange={() => handleAgreementChange('optionalC')}
            />
            (선택) 이메일 등 마케팅 정보 수신 동의
          </label>
        </div>
      </section>
      <div className='must'>*항목 누락 시 가입이 어렵습니다.</div>

      <button disabled={!isRegisterButtonEnabled}>프로필 등록하기</button>
    </div>
  );
}

export default Register;
