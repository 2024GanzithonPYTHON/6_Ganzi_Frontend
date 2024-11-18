import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './pages/login/Register';
import MyPage from './pages/myPage/MyPage';
import EditProfile from './pages/myPage/EditProfile';
import Home from './pages/Home/Home';
import FamilyCalendar from './pages/familycalendar/FamilyCalendar';

import './App.css'
import BottomNav from './global/BottomNav';
import styled from "styled-components"


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
          <Route path = "/" element = {<Home/>}/> {/*일단 예비로 빼뒀습니다. 디자인에 방해될 것 같아서요!*/ }
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Register" element={<Register />} />
          <Route path = "/FamilyCalendar" element = {<FamilyCalendar/>}/>
          {/* 다른 Route 추가 */}
        </Routes>
        <Footer>
          <BottomNav/>
        </Footer>
      </Router>

    </div>
  );
}

export default App;