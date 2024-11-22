import React from "react";
import styled from "styled-components";


const ScheduleContainer = styled.div`
    width: 359px;
    height: 324px;
    border-radius: 20px;
    background-color: var(--Color-3, #F8D785);
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`

function MySchedulelist(){
    return(
        <ScheduleContainer>
            <h1>스케줄 들어올 자리</h1>
        </ScheduleContainer>

    );
}

export default MySchedulelist;