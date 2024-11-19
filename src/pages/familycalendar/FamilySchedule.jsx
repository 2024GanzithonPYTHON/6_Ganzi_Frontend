import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Mock Data
const mockSchedules = [
    {
        personal_schedule_id: 1,
        schedule_title: "결혼기념일",
        schedule_date: "2024-11-16",
        start_time: "10:00:00",
        end_time: "12:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
    {
        personal_schedule_id: 2,
        schedule_title: "주간 회의",
        schedule_date: "2024-11-20", // 주간 회의는 매주 수요일
        start_time: "14:00:00",
        end_time: "15:00",
        is_daily: false,
        is_weekly: true,
        is_monthly: false,
        is_yearly: false,
    },
    {
        personal_schedule_id: 3,
        schedule_title: "운동",
        schedule_date: "2024-11-21", // 매일
        start_time: "06:00:00",
        end_time: "07:00",
        is_daily: true,
        is_weekly: false,
        is_monthly: false,
        is_yearly: false,
    },
    {
        personal_schedule_id: 4,
        schedule_title: "가족 모임",
        schedule_date: "2024-12-01", // 매년
        start_time: "18:00:00",
        end_time: "21:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
    {
        personal_schedule_id: 5,
        schedule_title: "생일 파티",
        schedule_date: "2024-11-30", // 매년
        start_time: "17:00:00",
        end_time: "20:00",
        is_daily: false,
        is_weekly: false,
        is_monthly: false,
        is_yearly: true,
    },
];

const ScheduleContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const ScheduleItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #fff; /* 배경색 추가 */
`;

const FamilySchedule = ({ selectedDate }) => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = () => {
            const filteredSchedules = mockSchedules.filter(schedule => {
                return isScheduleVisible(schedule, selectedDate);
            });

            setSchedules(filteredSchedules);
        };

        if (selectedDate) {
            fetchSchedules();
        }
    }, [selectedDate]);

    const isScheduleVisible = (schedule, date) => {
        const scheduleDate = new Date(schedule.schedule_date);
        const selectedDateObj = new Date(date);
        
        // 날짜 비교
        const isSameDate = scheduleDate.toDateString() === selectedDateObj.toDateString();
        const isDaily = schedule.is_daily === true;
        const isWeekly = schedule.is_weekly === true && selectedDateObj.getDay() === 2; // 수요일

        return isSameDate || isDaily || isWeekly;
    };

    return (
        <ScheduleContainer>
            {schedules.length === 0 ? (
                <p>일정이 없습니다.</p>
            ) : (
                schedules.map(schedule => (
                    <ScheduleItem key={schedule.personal_schedule_id}>
                        <div><strong>카테고리:로 추후대체될 부분 _ </strong> {schedule.personal_schedule_id}</div>
                        <div><strong>스케줄명:</strong> {schedule.schedule_title}</div>
                        <div><strong>시간:</strong> {schedule.start_time} - {schedule.end_time}</div>
                    </ScheduleItem>
                ))
            )}
        </ScheduleContainer>
    );
};

export default FamilySchedule;
