import styled from "styled-components";

const NicknameText = styled.span`
   color: #000;
    font-family: "Pretendard Variable";
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.56px;
    `

const MonthlyText = styled.span`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 28px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.56px;
    `
function Nickname(){
    return(
        <div>
            <NicknameText>멋진아빠</NicknameText>
            <MonthlyText>님의</MonthlyText>
            <br/>
            <MonthlyText>11월 스케줄</MonthlyText>
                
        </div>
    );
}

export default Nickname;