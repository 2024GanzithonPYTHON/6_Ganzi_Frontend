import styled from "styled-components";
import api from "../../api/api";
import React, { useEffect, useState } from "react";

const Container = styled.div`
    background-color: #f9e6a8; 
    border-radius: 8px; 
    padding: 20px;
    width: 300px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
`;

const ScheduleItem = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between; 
    margin: 10px 0; 
`;

const CategoryText = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

const DescriptionText = styled.span`
    font-size: 16px;
    color: #000;
    flex-grow: 1; 
    margin-left: 10px; 
`;

const DottedLine = styled.div`
    border-bottom: 1px dotted #000; 
    flex-grow: 1; 
    margin: 0 10px; 
`;

const Button = styled.button`
    background-color: transparent; 
    border: none; 
    color: #000; 
    font-size: 16px;
    cursor: pointer; 
    text-align: left; 
    margin-top: 10px; 
`;

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const token = localStorage.getItem("access_token"); // 로컬스토리지에서 액세스 토큰 가져오기
            if (!token) {
                console.error("Access token not found");
                return;
            }

            try {
                const response = await api.get('/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // API 응답에서 schedules 배열 추출
                setSchedules(response.data.schedules || []); // schedules가 없으면 빈 배열로 설정
            } catch (error) {
                console.error('Failed to fetch schedules:', error);
            }
        };

        fetchSchedules();
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    return (
        <Container>
            {schedules.map((schedule, index) => (
                <ScheduleItem key={index}>
                    <CategoryText>{schedule.category}</CategoryText>
                    <DescriptionText>{schedule.description}</DescriptionText>
                    <DottedLine />
                </ScheduleItem>
            ))}
            <Button>+ 스케줄 전부 확인하기</Button>
        </Container>
    );
}

export default ScheduleList;