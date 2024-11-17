import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/login/Register';
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
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Register" element={<Register />} />
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