import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import rejectingRequest from './asking/rejectingRequest';

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

const LoadingText = styled.p`
    font-size: 16px;
    color: #555;
    text-align: center;
`;

function RejectedSchedule() {
    const navigate = useNavigate();
    const userAccessToken = localStorage.getItem("access_token");
    const [incomingSchedules, setIncomingSchedules] = useState([]);
    const [activeTab, setActiveTab] = useState('reject'); // 활성화된 탭 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const handleAcceptSchedulesClick = () => {
        setActiveTab('accept'); // 탭 상태 업데이트
        navigate('/accepted-schedules'); // 받은 스케줄 페이지로 이동
        fetchIncomingSchedules(); // 데이터 요청
    };

    const handleSentSchedulesClick = () => {
        setActiveTab('sent'); // 탭 상태 업데이트
        navigate('/sent-schedules'); // 보낸 스케줄 페이지로 이동
        fetchIncomingSchedules(); // 데이터 요청
    };

    const handleRejectedSchedulesClick = () => {
        setActiveTab('reject'); // 탭 상태 업데이트
        fetchIncomingSchedules(); // 데이터 요청
    };

    const handleCardClick = (schedule) => {
        navigate('/rejected-request/:id', { state: { schedule } });
    };

    const fetchIncomingSchedules = async () => {
        setLoading(true); // 데이터 요청 전 로딩 시작
        try {
            const response = await api.get('/family/declined/', {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                }
            });
            const schedules = response.data.map(schedule => ({
                category: schedule.category_name,
                title: schedule.schedule_title,
                content: schedule.schedule_memo
            }));
            setIncomingSchedules(schedules);
        } catch (error) {
            console.error('API 요청 오류:', error.message);
        } finally {
            setLoading(false); // 데이터 요청 후 로딩 종료
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
                <Tab onClick={handleAcceptSchedulesClick} active={activeTab === 'accept'}>받은 스케줄</Tab>
                <Tab onClick={handleSentSchedulesClick} active={activeTab === 'sent'}>보낸 스케줄</Tab>
                <Tab onClick={handleRejectedSchedulesClick} active={activeTab === 'reject'}>거절한 스케줄</Tab>
            </TabContainer>
            {loading ? (
                <LoadingText>로딩중...</LoadingText>
            ) : (
                incomingSchedules.map((schedule, index) => (
                    <ScheduleCard key={index} onClick={() => handleCardClick(schedule)}>
                        <Category>{schedule.category}</Category>
                        <ScheduleTitle>{schedule.title}</ScheduleTitle>
                        <ScheduleContent>{schedule.content}</ScheduleContent>
                    </ScheduleCard>
                ))
            )}
        </Container>
    );
}

export default RejectedSchedule;
