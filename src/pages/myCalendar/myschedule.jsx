import React from 'react';
import styled from 'styled-components';

import WeekCalendar from "./myweek";
import MySchedulelist from "./myschedulelist";
import NewAddButton from "./newaddbutton";



const Container = styled.div`
    position: relative; /* 부모 요소를 기준으로 위치 설정 */
    padding-bottom: 50px; 
  `

const ButtonWrapper = styled.div`
    position: absolute; 
    bottom: 10px; 
    right: 10px; 
`;

function MyWeek() {
  return (
      <Container>
          <h1>주간 달력</h1>
          {/*<WeekCalendar />*/}
          <MySchedulelist />
          <ButtonWrapper>
              <NewAddButton />
          </ButtonWrapper>
      </Container>
  );
}

export default MyWeek;