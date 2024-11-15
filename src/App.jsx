import './App.css'
import {BrowserView, MobileView} from 'react-device-detect'
import styled from "styled-components"

import BottomNav from './global/BottomNav';

const StyledEx = styled.span`
 background-color: #B86217;
 color: Yellow;
 font-size: 50px;
 font-weight: bold;
 padding: 30px;
 `;

function App() {

  return (
    <>
      <div>
      <StyledEx>Flan</StyledEx>
      <br/><br/>

      <BrowserView>
        <h1>데톱용 로딩입니다</h1>
      </BrowserView>
      <MobileView>
        <h1>모바일용 로딩입니다</h1>
      </MobileView>
      <BottomNav/>
      </div>
    </>
  )
}

export default App