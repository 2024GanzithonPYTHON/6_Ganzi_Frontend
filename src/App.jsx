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
    <>
      <div>
      <StyledEx>Flan</StyledEx>
      <br/><br/>
      <h1> Flan 프론트엔드용 Vite React입니다</h1>
      <h2>도유성 이가영 파이팅~!</h2>
      </div>
    </>
  )
}

export default App