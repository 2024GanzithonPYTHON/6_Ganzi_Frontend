import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"; //경로
import "./SingleNRoutine.css";
import Calendar from '../familycalendar/Calendar';
import apiClient from "../../api/axClient";
import Load from '../../assets/workCategory/loading-img.gif';

const App = () => {
  const [selectedScheduleType, setSelectedScheduleType] = useState("date"); // 기본값: 지정된 날짜
  const [startTime, setStartTime] = useState(""); // 시작 시간
  const [endTime, setEndTime] = useState(""); // 종료 시간
  const [selectedDate, setSelectedDate] = useState(""); // 달력에서 선택한 날짜
  const [isRepeated, setIsRepeated] = useState(0); // 반복 여부 및 타입 (0: 없음, 1~4)
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");
  const [recurringMonth, setRecurringMonth] = useState("01");
  const [recurringDay, setRecurringDay] = useState("01");
  const [recurringHour, setRecurringHour] = useState("00");
  const { setFirstlData, setBackendResponse } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const combineDateTime = (date, hour, minute) => {
    return `${date} ${hour}:${minute}:00`;
  };

  const handleSubmit = async () => {
    let finalStartTime = startTime;
    let finalEndTime = endTime;
  
    // 활성화된 섹션에 따라 시간 설정
    if (selectedScheduleType === "date") {
      finalStartTime = combineDateTime(selectedDate, startHour, startMinute);
      finalEndTime = combineDateTime(selectedDate, endHour, endMinute);
    } else if (selectedScheduleType === "recurring") {
      finalStartTime = `2024-${recurringMonth}-${recurringDay} ${recurringHour}:00:00`;
      finalEndTime = `2024-${recurringMonth}-${recurringDay} ${recurringHour}:00:00`; // 반복 일정에서는 종료 시간이 없거나 추가 설정이 필요
    }
  
    const data = {
      start_time: finalStartTime,
      end_time: finalEndTime,
      is_repeated: String(isRepeated),
    };
    setIsLoading(true);
    try {
      console.log(data);
      const response = await apiClient.post("/sch_requests/get-available-user/", data); // 엔드포인트 변경
      console.log("Success:", response.data);
      setBackendResponse(response.data); // 백엔드 응답 저장
      setFirstlData(data); // 초기 데이터 저장
      navigate("/DetailWorks", {state: { availableUsers: response.data}}); // 세부 업무 선택 페이지로 이동
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="page-title">가족 일정 등록하기</div>

      <div className="schedule-selector">
        <div className="schedule-question">스케쥴 일정은 언제인가요?</div>
        <div className="button-container">
          <div className="button-wrapper">
            <button
              className={`schedule-button ${selectedScheduleType === "date" ? "active" : ""}`}
              onClick={() => setSelectedScheduleType("date")}
            >
              지정된 날짜
            </button>
            <button
              className={`schedule-button ${selectedScheduleType === "recurring" ? "active" : ""}`}
              onClick={() => setSelectedScheduleType("recurring")}
            >
              반복되는 일정
            </button>
          </div>
        </div>
      </div>

      {/* 스케줄 선택 UI */}
      <div className="schedule-display">
        {selectedScheduleType === "date" ? (
          <div>
            {/* 첫 번째 섹션: 지정된 날짜 */}
            <Calendar
              onDateSelect={(date) => setSelectedDate(date.toISOString().split("T")[0])}
            />
            <div className="time-select">
              <label className="start-label">시작</label>
              <select className="time-selecter"
                value={startHour}
                onChange={(e) => {
                  setStartHour(e.target.value);
                  setStartTime(
                    combineDateTime(selectedDate, e.target.value, startMinute)
                  );
                }}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}시

                  </option>
                ))}
              </select>
              <select className="time-selecter"
                value={startMinute}
                onChange={(e) => {
                  setStartMinute(e.target.value);
                  setStartTime(
                    combineDateTime(selectedDate, startHour, e.target.value)
                  );
                }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}분
                  </option>
                ))}
              </select>
            </div>
            <div className="time-select">
              <label className="end-label">종료</label>
              <select className="time-selecter"
                value={endHour}
                onChange={(e) => {
                  setEndHour(e.target.value);
                  setEndTime(
                    combineDateTime(selectedDate, e.target.value, endMinute)
                  );
                }}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}시
                  </option>
                ))}
              </select>
              <select className="time-selecter"
                value={endMinute}
                onChange={(e) => {
                  setEndMinute(e.target.value);
                  setEndTime(
                    combineDateTime(selectedDate, endHour, e.target.value)
                  );
                }}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}분
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                기념일
                <input
                  type="checkbox"
                  onChange={(e) => setIsRepeated(e.target.checked ? 4 : 0)}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="rutine-section">
            {/* 두 번째 섹션: 반복 일정 */}
            <div className="rutine-title">주기를 선택해 주세요</div>
            <div className="recurring-buttons">
              {[
                { label: (
                  <div>
                    <div className="rutine-num">1</div>
                    <div className="rutine-ex">데일리</div>
                  </div>
                ), value: 1 },
                { label: (
                  <div>
                    <div className="rutine-num">7</div>
                    <div className="rutine-ex">위클리</div>
                  </div>
                ), value: 2 },
                { label: (
                  <div>
                    <div className="rutine-num">30</div>
                    <div className="rutine-ex">먼슬리</div>
                  </div>
                ), value: 3 },
                  ].map((btn) => (
                <button
                  key={btn.value}
                  className={`recurring-button ${
                    isRepeated === btn.value ? "active" : ""
                  }`}
                  onClick={() => setIsRepeated(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="rutine-title2">시작하는 날짜가 언제인가요?</div>
            <div className="time-select2">
              <select className="time-selecter"
                value={recurringMonth}
                onChange={(e) => setRecurringMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                    {i + 1}월
                  </option>
                ))}
              </select>
              
              <select className="time-selecter"
                value={recurringDay}
                onChange={(e) => setRecurringDay(e.target.value)}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                    {i + 1}일
                  </option>
                ))}
              </select>
              
              <select className="time-selecter"
                value={recurringHour}
                onChange={(e) => setRecurringHour(e.target.value)}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}시
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        계속하기
      </button>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-text">일정이 가능한<br/>가족구성원을 찾고 있어요:D</div>
          <img
            src={Load}
            alt="로딩 중"
            className="loading-image"
          />
        </div>
      )}
    </div>
  );
};

export default App;