import React from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
    background-color: #f8f8f8;
`;

const Header = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
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
    background-color: #ffeb3b;
    border-radius: 10px;
    padding: 15px;
    margin: 10px 0;
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
    const schedules = [
        { category: '보낸 스케줄', title: '제목입니다', content: '내용입니다. 내용입니다. 내용입니다.' },
        { category: '보낸 스케줄', title: '제목입니다', content: '내용입니다. 내용입니다. 내용입니다.' },
    ];

    return (
        <Container>
            <Header>FLAN</Header>
            <SubHeader>가족 스케줄 관리</SubHeader>
            <TabContainer>
                <Tab active>받은 스케줄</Tab>
                <Tab>보낸 스케줄</Tab>
                <Tab>거절한 스케줄</Tab>
            </TabContainer>
            {schedules.map((schedule, index) => (
                <ScheduleCard key={index}>
                    <Category>{schedule.category}</Category>
                    <ScheduleTitle>{schedule.title}</ScheduleTitle>
                    <ScheduleContent>{schedule.content}</ScheduleContent>
                </ScheduleCard>
            ))}
        </Container>
    );
}

export default AcceptList;
