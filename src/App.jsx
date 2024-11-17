import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import SelectRoutine from './pages/scheduleRequest/SingleNRoutine';
import Loading from './pages/scheduleRequest/Loading';
import MyPage from './pages/myPage/MyPage';
import EditProfile from './pages/myPage/EditProfile';
import './App.css'
import styled from "styled-components"

import BottomNav from './global/BottomNav';

const StyledEx = styled.span`
 background-color: #B86217;
 color: Yellow;
 font-size: 50px;
 font-weight: bold;
 padding: 30px;
 `;

const Footer = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100%
`;

 function App() {
  return (
    <div id="app"> 
      <Router>
        <Routes>
          {/* 라우트 서순 정리 : import 문도 순서 연동하면 나중에 빠진거 확인할때 나을것 같긴 행 */}
          {/* 로그인 */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* 메인 페이지 */}
          {/* 가족 일정 등록 */}
          <Route path="/SingleNroutine" element={<SelectRoutine />} />
          <Route path="/Loading" element={<Loading duration={5000} redirectTo="/Detailworks" />} />
          {/* 마이페이지 */}
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          {/* 요청 스케쥴 관리 */}
          {/* 내 스케쥴 */}
          {/* 광고 팝업 */}
          {/* 초대장 */}
          {/* 다른 Route 추가 */}
        </Routes>

        <div>
          <StyledEx>Flan</StyledEx>
          <br /><br />
          <h1>Flan 프론트엔드용 Vite React입니다</h1>
        </div>
        <Footer>
          <BottomNav/>
        </Footer>
      </Router>

    </div>
  );
}

export default App;