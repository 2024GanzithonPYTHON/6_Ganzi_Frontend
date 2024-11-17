import styled
 from "styled-components";
const StyledEx = styled.span`
 background-color: #B86217;
 color: Yellow;
 font-size: 50px;
 font-weight: bold;
 padding: 30px;
 `;

function Home(){
    return(
        <div>
            <StyledEx>Flan</StyledEx>
        </div>
    );
}

export default Home;