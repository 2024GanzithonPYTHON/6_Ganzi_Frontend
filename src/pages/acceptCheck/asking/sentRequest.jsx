import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Clap from '../../../assets/clap.png';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';

// 스타일 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
    background-color: #fff;
`;

const Header = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`;

const RequestInfo = styled.p`
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
`;

const Image = styled.img`
    display: block;
    margin: 0 auto;
    width: 80px;
    height: auto;
`;

const Category = styled.p`
    font-weight: bold;
    font-size: 18px;
    margin: 20px 0;
    text-align: center;
`;

const ScheduleDetails = styled.div`
    background-color: #FFF9E8;
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    margin: 10px 0;
`;

const ScheduleTitle = styled.p`
    font-weight: bold;
    color: #d9534f;
`;

const ScheduleDate = styled.p`
    font-size: 14px;
    color: #555;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const Button = styled.button`
    background: linear-gradient(90deg, #f7e8a1, #f1c40f);
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
`;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000; // 팝업을 최상위로
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999; // 오버레이를 팝업 아래에
`;

function SentRequest() {
    const [showPopup, setShowPopup] = useState(false);
    const [scheduleData, setScheduleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams(); // URL 파라미터에서 ID 가져오기
    const userAccessToken = localStorage.getItem("access_token");

    const fetchScheduleData = async () => {
        setLoading(true);
        try {
            // URL에서 id를 사용하여 요청
            const response = await api.get(`/family/outgoing/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                }
            });
            setScheduleData(response.data);
        } catch (error) {
            console.error('API 요청 오류:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScheduleData(); // 컴포넌트가 마운트될 때 데이터 요청
    }, [id]);

    const handleAccept = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/Acceptance'); // Acceptance 페이지로 이동
    };

    if (loading) {
        return <p>로딩중...</p>;
    }

    if (!scheduleData) {
        return <p>스케줄 데이터를 찾을 수 없습니다.</p>;
    }

    return (
        <Container>
            <Header>가족 스케줄 관리</Header>
            <Image src={Clap} alt="하이파이브" />
            <RequestInfo>{scheduleData.sent_user_name}의 요청입니다.</RequestInfo>
            <RequestInfo>요청사항을 검토 후 확정하면 스케줄이 등록됩니다.</RequestInfo>

            <Category>{scheduleData.category_name}</Category>
            <ScheduleDetails>
                <ScheduleTitle>{scheduleData.schedule_title}</ScheduleTitle>
                <ScheduleDate>{scheduleData.schedule_time}</ScheduleDate>
                <ScheduleDetails>{scheduleData.schedule_memo}</ScheduleDetails>
            </ScheduleDetails>

            <ButtonContainer>
                <Button onClick={handleAccept}>수락하기</Button>
                <Button>거절하기</Button>
            </ButtonContainer>

            {showPopup && (
                <>
                    <Overlay onClick={handleClosePopup} />
                    <Popup>
                        <h2>수락되었습니다!</h2>
                        <p>스케줄이 성공적으로 수락되었습니다.</p>
                        <Button onClick={handleClosePopup}>확인</Button>
                    </Popup>
                </>
            )}
        </Container>
    );
}

export default SentRequest;
