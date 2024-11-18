import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/login/Register';
import MyPage from './pages/myPage/MyPage';
import EditProfile from './pages/myPage/EditProfile';
import Home from './pages/Home/Home';
import FamilyCalendar from './pages/familycalendar/FamilyCalendar';
import SelectRoutine from './pages/scheduleRequest/SingleNRoutine';
import Loading from './pages/scheduleRequest/Loading';
import LoginPage from './pages/login/Login';
import './App.css'
import Logo from './global/Logo';
import BottomNav from './global/BottomNav';
import styled from "styled-components"

const LogoFix = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100%

`
// 로고와 간격을 주기위한 패딩
const Content = styled.div`
    padding-top: 100px; /* 로고 높이만큼 패딩 추가 (데스크탑) */
    @media (max-width: 420px) {
        padding-top: 60px; /* 로고 높이만큼 패딩 추가 (모바일) */
    }
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
        <LogoFix>
          <Logo/>
        </LogoFix>
        <Content>
        <Routes>
          <Route path = "/" element = {<Home/>}/> {/*일단 예비로 빼뒀습니다. 디자인에 방해될 것 같아서요!*/ }
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Register" element={<Register />} />
          <Route path = "/FamilyCalendar" element = {<FamilyCalendar/>}/>
          <Route path="/SingleNroutine" element={<SelectRoutine />} />
          <Route path="/Loading" element={<Loading duration={5000} redirectTo="/Detailworks" />} />
          <Route path="/Login" element={<LoginPage />} />
          {/* 다른 Route 추가 */}
        </Routes>
        </Content>
        <Footer>
          <BottomNav/>
        </Footer>
      </Router>

    </div>
  );
}

export default App;