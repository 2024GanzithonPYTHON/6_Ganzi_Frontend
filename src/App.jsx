import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './pages/myPage/MyPage';
import './App.css'
import styled from "styled-components"

const StyledEx = styled.span`
 background-color: #B86217;
 color: Yellow;
 font-size: 50px;
 font-weight: bold;
 padding: 30px;
 `;

 function App() {
  return (
    <div id="app"> 
      <Router>
        <Routes>
          <Route path="/MyPage" element={<MyPage />} />
          {/* 다른 Route 추가 */}
        </Routes>

        <div>
          <StyledEx>Flan</StyledEx>
          <br /><br />
          <h1>Flan 프론트엔드용 Vite React입니다</h1>
          <h2>도유성 이가영 파이팅~!</h2>
          <h2>으쌰으쌰 파이팅팅팅.</h2>
        </div>
      </Router>
    </div>
  );
}

export default App;