import React, { useEffect } from 'react'; /* useEffect 추가 */
import { BrowserRouter as Router, Route, Routes, Navigate /* Navigate 추가 */ } from 'react-router-dom';
import { DataProvider } from "./contexts/DataContext";
import Register from './pages/login/Register';
import MyPage from './pages/myPage/myPage';
import EditProfile from './pages/myPage/EditProfile';
import Home from './pages/Home/Home';
import FamilyCalendar from './pages/familycalendar/FamilyCalendar';
import MyWeek from './pages/myCalendar/myschedule';
import MyMemo from './pages/Memo/MyMemo';
import EditMyCalendar from './pages/myCalendar/editMyCalendar/editMyCalendar';
import SelectRoutine from './pages/scheduleRequest/SingleNRoutine';
import SelectWork from './pages/scheduleRequest/DetailWorks';
import LoginPage from './pages/login/Login';
import KakaoRedirector from './pages/login/KakaoLoginRedirection';
import './App.css'
import Logo from './global/Logo';
import AcceptList from './pages/acceptCheck/acceptlist';
import ScheduleRequest from './pages/acceptCheck/asking/scheduleRequest';
import SentSchedule from './pages/acceptCheck/sentSchedule';
import RejectedSchedule from './pages/acceptCheck/rejectedSchedule';
import RejectedRequest from './pages/acceptCheck/asking/rejectingRequest';
import SentRequest from './pages/acceptCheck/asking/sentRequest';
import BottomNav from './global/BottomNav';
import styled from "styled-components"
import axios from 'axios';


const LogoFix = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100%

`
// 로고와 간격을 주기위한 패딩
const Content = styled.div`
    padding-top: 50px;
    padding-bottom: 60px; /* 하단 내비게이션 바 높이만큼 패딩 추가 (모바일) */
    @media (max-width: 393px) {
        padding-top: 60px; /* 모바일에서는 로고 높이만큼 패딩 추가 */
        padding-bottom: 50px; /* 모바일에서는 하단 내비게이션 바 높이만큼 패딩 추가 */
`;

const Footer = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100%
`;

 function App() {
  // 로그인 성공 후
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0ODgyOTYwLCJpYXQiOjE3MzIyOTA5NjAsImp0aSI6Ijk3ZTkyYjYzNDBjZTQ5ZDNhMTExNDU2MWJjY2Q0NmY0IiwidXNlcl9pZCI6MjN9.njoLLszLK8POmqiGYYuRVhrmm0gAF2CMe5SfnYq1Y5c"; // 서버에서 받은 액세스 토큰
  const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMzUwMDU2MCwiaWF0IjoxNzMyMjkwOTYwLCJqdGkiOiJkYmYwMzgyMDE0OTQ0ZWE0ODJmOWJkY2RjMmFmNDNiZCIsInVzZXJfaWQiOjIzfQ.yLxlwnj3YucqrUdsx8As3Rp7qDAdaUnpN60bZ92ExKE"; // 서버에서 받은 리프레시 토큰

  // 로컬스토리지에 토큰 저장
  localStorage.setItem("access_token", token);
  localStorage.setItem("refresh_token", refreshToken);

  {/*useEffect(() => {
    // refresh_token 존재 여부 확인 +(로그인 상태 판단 뭘로하는지 물어봐야됨)
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      window.location.href = "/MyPage"; //우선 구현된 페이지
    }
  }, []);*/}

  return (
    <div id="app"> 
      <Router>
        <LogoFix>
          <Logo/>
        </LogoFix>
        <Content>
        <Routes>
          <Route path = "/" element = {<LoginPage />}/> {/*일단 예비로 빼뒀습니다. 디자인에 방해될 것 같아서요!*/ }
          <Route path = "/Home" element = {<Home/>}/> {/*일단 예비로 빼뒀습니다. 디자인에 방해될 것 같아서요!*/ }
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Register" element={<Register />} />
          <Route path = "/MyWeek" element = {<MyWeek/>}/>
          <Route path = "/FamilyCalendar" element = {<FamilyCalendar/>}/>
          <Route path = "/MyMemo" element = {<MyMemo/>}/>
          <Route path="/SingleNRoutine" element={<DataProvider><SelectRoutine /></DataProvider>} />
          <Route path="/DetailWorks" element={<DataProvider><SelectWork /></DataProvider>} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/KakaoLoginRedirection" element={<KakaoRedirector />} />
          <Route path = "/EditMyCalendar" element = {<EditMyCalendar/>}/>
          <Route path = "/Acceptance" element = {<AcceptList/>}/>
          <Route path="/schedule-request/:id" element={<ScheduleRequest />} />
          <Route path="/rejected-request/:id" element={<RejectedRequest />} />
          <Route path="/sent-request/:id" element={<SentRequest/>} />
          <Route path="/sent-schedules" element={<SentSchedule />} />
          <Route path="/rejected-schedules" element={<RejectedSchedule />}/>
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