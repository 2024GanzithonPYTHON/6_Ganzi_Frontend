import React, { useEffect, useState } from 'react';

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

function FamilySchedule({ selectedDate }) {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = () => {
            const filteredSchedules = mockSchedules.filter(schedule => {
                // 선택된 날짜가 일정의 날짜와 같거나,
                // is_daily가 true일 경우,
                // is_weekly가 true일 경우 주간 요일과 일치 여부 확인
                const isSameDate = schedule.schedule_date === selectedDate;
                const isDaily = schedule.is_daily === true;
                const isWeekly = schedule.is_weekly === true && new Date(selectedDate).getDay() === 3; // 예: 수요일

                return isSameDate || isDaily || isWeekly;
            });

            setSchedules(filteredSchedules);
        };

        if (selectedDate) {
            fetchSchedules();
        }
    }, [selectedDate]);

    return (
        <div>
            <h2>가족 일정</h2>
            {schedules.length === 0 ? (
                <p>일정이 없습니다.</p>
            ) : (
                schedules.map((schedule, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div><strong>일정 ID:</strong> {schedule.personal_schedule_id}</div>
                        <div><strong>스케줄명:</strong> {schedule.schedule_title}</div>
                        <div><strong>날짜:</strong> {schedule.schedule_date}</div>
                        <div><strong>시간:</strong> {schedule.start_time} - {schedule.end_time}</div>
                    </div>
                ))
            )}
        </div>
    );
}

export default FamilySchedule;
