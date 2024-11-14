import React, { useState } from 'react';

function EditProfile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      {/* 프로필 수정 제목 */}
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>프로필 수정</h1>
        
      <button>뒤로가기</button>  
      {/* 프로필 이미지 업로드 버튼 */}
      <label htmlFor="profileImageUpload" style={{ cursor: 'pointer', marginBottom: '10px' }}>
        {profileImage ? (
          <img src={profileImage} alt="프로필 이미지" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        ) : (
          <div style={{
            width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <span>이미지 등록하기</span>
          </div>
        )}
      </label>
      <input type="file" id="profileImageUpload" style={{ display: 'none' }} onChange={handleImageUpload} />

      제목

      {/* 닉네임 입력 */}
      <input
        type="text"
        placeholder="닉네임"
        style={{ marginTop: '10px', padding: '10px', width: '200px', fontSize: '16px' }}
      />

      {/* 회원 탈퇴하기 버튼 */}
      <button style={{ marginTop: '20px', color: 'red', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>
        회원 탈퇴하기
      </button>

      {/* 저장하기 버튼 */}
      <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        저장하기
      </button>
    </div>
  );
}

export default EditProfile;
