import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/api';

// 스타일 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
`;

const SubHeader = styled.h2`
    font-size: 18px;
    text-align: left;
    margin: 20px 0;
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => (props.active ? '#000' : '#888')};
`;

const ScheduleCard = styled.div`
    border-radius: 15px;
    background: #FFF9E8;
    width: 349px;
    height: 84px;
    padding: 10px; 
    margin-bottom: 20px;
`;

const Category = styled.p`
    font-weight: bold;
`;

const ScheduleTitle = styled.p`
    margin: 5px 0;
`;

const ScheduleContent = styled.p`
    font-size: 12px;
    color: #555;
`;

function RejectedSchedule() {
    const navigate = useNavigate();
    const userAccessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 액세스 토큰 가져오기
    const [incomingSchedules, setIncomingSchedules] = useState([]);
        // 보낸 스케줄 클릭 핸들러
        const handleSentSchedulesClick = () => {
            navigate('/sent-schedules'); // 보낸 스케줄 페이지로 이동
        };
        // 받은 스케줄 클릭핸들러
        const handleacceptSchedulesClick = () => {
            navigate('/Acceptance'); // 보낸 스케줄 페이지로 이동
            };
    
        // 거절한 스케줄 클릭 핸들러
        const handleRejectedSchedulesClick = () => {
            navigate('/rejected-schedules'); // 거절한 스케줄 페이지로 이동
        };

    const handleCardClick = (schedule) => {
        // 스케줄 정보를 상태나 컨텍스트에 저장하고, 페이지 이동
        navigate('/schedule-request', { state: { schedule } });
    };

    // 받은 스케줄을 가져오는 함수
    const fetchIncomingSchedules = async () => {
        try {
            const response = await api.get('/family/incoming/', {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                }
            });

            setIncomingSchedules(response.data); // 받은 스케줄 데이터를 상태에 저장
        } catch (error) {
            console.error('API 요청 오류:', error.message); // 오류 메시지 출력
        }
    };

    // 컴포넌트가 마운트될 때 스케줄 데이터 가져오기
    useEffect(() => {
        fetchIncomingSchedules();
    }, []);


    return (
        <Container>
            <SubHeader>가족 스케줄 관리</SubHeader>
            <TabContainer>
                <Tab  onClick={handleacceptSchedulesClick}>받은 스케줄</Tab>
                <Tab onClick={(handleSentSchedulesClick)}>보낸 스케줄</Tab>
                <Tab active onClick={handleRejectedSchedulesClick}>거절한 스케줄</Tab>
            </TabContainer>
            {incomingSchedules.map((schedule, index) => (
                <ScheduleCard key={index} onClick={() => handleCardClick(schedule)}>
                    <Category>{schedule.category}</Category>
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                    <ScheduleContent>{schedule.content}</ScheduleContent>
                </ScheduleCard>
            ))}
        </Container>
    );
}

export default RejectedSchedule;

