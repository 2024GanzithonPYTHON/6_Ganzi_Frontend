import styled from "styled-components";
import Nickname from "./Nickname";
import father from "../../assets/father.png";
import ScheduleList from "./mainSchedule";
import FamilysMemo from "./familysmemeo";
import MainAd from "./mainAd";

const Container = styled.div`
    display: flex;
    align-items: center;
    text-align: left; 
    margin: 20px; 
`;

const Image = styled.img`
    width: 150px; 
    height: auto; 
    margin-left: 20px;
`;

const TextContainer = styled.div`
    display: flex; 
    flex-direction: column;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-top: 20px; 
`;

const AdWrapper = styled.div`
    display: flex; /* 플렉스 박스 사용 */
    justify-content: center; /* 가로 중앙 정렬 */
    margin-top: 20px; /* 광고 위 여백 */
`;

function Home() {
    return (
        <div>
            <Container>
                <TextContainer>
                    <Nickname />
                    <span>가족들과 소중한 하루하루를 FLAN과 같이 만들어봐요!</span>
                </TextContainer>
                <Image src={father} alt="아빠 이미지" />
            </Container>
            <CenteredContainer>
                <ScheduleList />
            </CenteredContainer>
            <CenteredContainer>
                <FamilysMemo/>
            </CenteredContainer>
            <AdWrapper><MainAd/></AdWrapper>
            
        </div>
    );
}

export default Home;