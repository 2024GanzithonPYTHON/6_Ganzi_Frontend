import React, { useState } from "react";
import "./SingleNroutine.css";

const App = () => {
  const [selectedScheduleType, setSelectedScheduleType] = useState("date"); // 기본값: 지정된 날짜

  return (
    <div className="app-container">
      <div className="page-title">가족 일정 등록하기</div>

      <div className="schedule-selector">
        <p className="schedule-question">스케쥴 일정은 언제인가요?</p>
        <div className="button-container">
          <div className="button-wrapper">
            <button className={`schedule-button ${selectedScheduleType === "date" ? "active" : ""}`}
                onClick={() => setSelectedScheduleType("date")}>
                지정된 날짜</button>
            <button className={`schedule-button ${selectedScheduleType === "recurring" ? "active" : ""}`}
              onClick={() => setSelectedScheduleType("recurring")}>
              반복되는 일정</button>
          </div>
        </div>    
        <div className="schedule-display">
          {selectedScheduleType === "date" ? (
            <div className="placeholder date-placeholder">날짜 선택 달력</div>
          ) : (
            <div className="placeholder recurring-placeholder">
              반복 일정 달력
            </div>
          )}
        </div>
      </div>

      <button className="continue-button">계속하기</button>
    </div>
  );
};

export default App;
