import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../auth/axiosInstance'; // API 경로를 확인하세요.

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

function AcceptList() {
    const navigate = useNavigate();
    const userAccessToken = localStorage.getItem("access_token");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('accept'); // 활성화된 탭 상태 추가

    // 엔드포인트 매핑
    const endpoints = {
        accept: '/family/incoming/',
        sent: '/family/outgoing/',
        reject: '/family/declined/',
    };

    const fetchSchedules = async (tab) => {
        setLoading(true);
        try {
            const response = await api.get(endpoints[tab], {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                }
            });
            setSchedules(response.data);
        } catch (error) {
            console.error('API 요청 오류:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules(activeTab); // 기본적으로 활성화된 탭의 스케줄 데이터 가져오기
    }, [activeTab]);

    const handleCardClick = (schedule) => {
        // 현재 활성화된 탭에 따라 다른 URL로 이동
        let requestType;
        if (activeTab === 'sent') {
            requestType = 'sent-request';
        } else if (activeTab === 'reject') {
            requestType = 'rejected-request';
        } else {
            requestType = 'schedule-request';
        }
        navigate(`/${requestType}/${schedule.id}`); // id를 URL 파라미터로 전달
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab); // 활성화된 탭 상태 업데이트
    };

    return (
        <Container>
            <SubHeader>가족 스케줄 관리</SubHeader>
            <TabContainer>
                <Tab onClick={() => handleTabClick('accept')} active={activeTab === 'accept'}>받은 스케줄</Tab>
                <Tab onClick={() => handleTabClick('sent')} active={activeTab === 'sent'}>보낸 스케줄</Tab>
                <Tab onClick={() => handleTabClick('reject')} active={activeTab === 'reject'}>거절한 스케줄</Tab>
            </TabContainer>
            {loading ? (
                <p>로딩중...</p>
            ) : (
                schedules.map((schedule) => (
                    <ScheduleCard key={schedule.id} onClick={() => handleCardClick(schedule)}>
                        <Category>{schedule.category_name}</Category>
                        <ScheduleTitle>{schedule.schedule_title}</ScheduleTitle>
                        <ScheduleContent>{schedule.schedule_memo}</ScheduleContent>
                    </ScheduleCard>
                ))
            )}
        </Container>
    );
}

export default AcceptList;
