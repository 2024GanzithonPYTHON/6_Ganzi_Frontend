import React from "react";
import "./Popup.css"; // 스타일 분리

const Popup = ({ availableDate, dayOfWeek, adPlace, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* 팝업 내용 */}
        <p>
          다가오는 <span className="highlight">{dayOfWeek}</span>,<br/>가족들과{" "}
          <span className="highlight">{adPlace[0].place_name}</span>로 떠나볼까요?
        </p>
        <p>
          <span className="highlight">{availableDate}</span>은 가족 구성원 모두의
          일정이 비어있어요. 스케쥴 요청하기를 통해 가족들과 일정을 계획해보세요.
        </p>
        <div className="place-section">
          <img
            src={adPlace[0].place_img}
            alt={adPlace[0].place_name}
            className="place-image"
          />
          <button
            href={adPlace[0].place_link}
            target="_blank"
            rel="noopener noreferrer"
            className="place-link-button"
          >
            예약하러 가기
            </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
