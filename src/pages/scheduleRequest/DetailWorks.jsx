import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./DetailWorks.css"; // 스타일링 파일
import AddButton from "../../assets/workCategory/addButton.png"; 
import Homeworka from "../../assets/workCategory/homework1.png"; 
import Homeworkb from "../../assets/workCategory/homework2.png"; 
import Homeworkc from "../../assets/workCategory/homework3.png"; 
import Homeworkd from "../../assets/workCategory/homework4.png"; 
import Homeworke from "../../assets/workCategory/homework5.png"; 
import Homework from "../../assets/workCategory/homework.png"; 
import Cooka from "../../assets/workCategory/cook1.png"; 
import Cookb from "../../assets/workCategory/cook2.png"; 
import Cookc from "../../assets/workCategory/cook3.png"; 
import Cookd from "../../assets/workCategory/cook4.png"; 
import Cooke from "../../assets/workCategory/cook5.png"; 
import Cook from "../../assets/workCategory/cook.png"; 
import Moneya from "../../assets/workCategory/money1.png"; 
import Moneyb from "../../assets/workCategory/money2.png"; 
import Moneyc from "../../assets/workCategory/money3.png"; 
import Moneyd from "../../assets/workCategory/money4.png"; 
import Moneye from "../../assets/workCategory/money5.png"; 
import Money from "../../assets/workCategory/money.png"; 
import Childrena from "../../assets/workCategory/children1.png"; 
import Childrenb from "../../assets/workCategory/children2.png"; 
import Childrenc from "../../assets/workCategory/children3.png"; 
import Childrend from "../../assets/workCategory/children4.png"; 
import Childrene from "../../assets/workCategory/children5.png"; 
import Children from "../../assets/workCategory/children.png"; 
import Healtha from "../../assets/workCategory/health1.png"; 
import Healthb from "../../assets/workCategory/health2.png"; 
import Healthc from "../../assets/workCategory/health3.png"; 
import Healthd from "../../assets/workCategory/health4.png"; 
import Healthe from "../../assets/workCategory/health5.png"; 
import Health from "../../assets/workCategory/health.png"; 
import Etca from "../../assets/workCategory/etc1.png"; 
import Etcb from "../../assets/workCategory/etc2.png"; 
import Etcc from "../../assets/workCategory/etc3.png"; 
import Etcd from "../../assets/workCategory/etc4.png"; 
import Etce from "../../assets/workCategory/etc5.png"; 
import Etc from "../../assets/workCategory/etc.png";  
import apiClient from "../../api/axClient";


const DetailWorks = () => {
  const { state } = useLocation();
  const { firstData } = useContext(DataContext); // DataContext에서 데이터 가져오기
  const [categoryId, setCategoryId] = useState(null); // 선택된 카테고리
  const [title, setTitle] = useState(""); // 최종 title 값
  const [isCustomTitle, setIsCustomTitle] = useState(false); // 추가하기 버튼 활성화 여부
  const [customTitle, setCustomTitle] = useState(""); // 사용자 정의 title 입력값
  const [targetUsers, setTargetUsers] = useState([]); // 선택된 사용자 ID
  const [memo, setMemo] = useState("");
  const navigate = useNavigate();

  const availableUsers = state?.availableUsers || [];

  // 카테고리 및 상세 업무 데이터
  const categories = [
    { id: 1,
      name: "가사",
      image: Homework,
      details: [
        {name: "세탁하기", image: Homeworka}, {name: "청소기 돌리기", image: Homeworkb}, {name: "분리수거", image: Homeworkc},{name: "화장실 청소",image: Homeworkd},{name: "음식물 쓰레기", image:Homeworke},{name: "추가하기", image: AddButton}] },
    { id: 2,
      name: "요리",
      image: Cook,
      details: [
        {name: "장보기", image: Cooka},{name: "설거지",image:Cookb},{name: "냉장고 정리",image:Cookc},{name: "식사 당번",image:Cookd},{name: "주방 대청소",image:Cooke},{name: "추가하기", image: AddButton}] },
    { id: 3,
      name: "가계",
      image : Money,
      details: [
        {name:"공과금 납부",image:Moneya}, {name: "영수증 정리",image: Moneyb}, {name:"교육비 납부",image:Moneyc}, {name: "은행 업무", image:Moneyd}, {name:"가계부 쓰기",image:Moneye}, {name: "추가하기", image: AddButton}] },
    { id: 4,
      name: "자녀 교육",
      image: Children,
      details: [
        {name: "픽업",image:Childrena}, {name:"픽드랍",image:Childrenb},{name: "학교 방문",image:Childrenc},{name:"체험 학습",image:Childrend},{name: "독서",image:Childrene}, {name: "추가하기", image: AddButton}] },
    { id: 5,
      name: "건강",
      image: Health,
      details: [
        {name: "병원 방문", image:Healtha}, {name:"건강검진",image:Healthb}, {name:"예방접종",image:Healthc},{name: "운동",image: Healthd},{name: "약 먹기",image:Healthe}, {name: "추가하기", image: AddButton}] },
    { id: 6,
      name: "기타",
      image:Etc,
      details: [
        {name:"생일",image:Etca}, {name:"여행",image:Etcb}, {name:"반려동물 케어",image:Etcc},{name: "외식",image: Etcd}, {name: "모임",image:Etce}, {name: "추가하기", image: AddButton}] },
  ];

  const handleCategorySelect = (id) => {
    setCategoryId(id);
    setTitle(""); // 기존 title 초기화
    setIsCustomTitle(false);
    setCustomTitle("");
  };

  const handleDetailSelect = (detail) => {
    if (detail === "추가하기") {
      setIsCustomTitle(true);
      setTitle(""); // 사용자 입력으로 전환
    } else {
      setIsCustomTitle(false);
      setTitle(detail);
    }
  };

  const handleUserSelect = (userId) => {
    setTargetUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // 이미 선택된 경우 제외
      } else {
        return [...prev, userId]; // 선택된 사용자 추가
      }
    });
  };

  const generateRepeatedFlags = (isRepeated) => {
    const flags = {
      is_daily: "0",
      is_weekly: "0",
      is_monthly: "0",
      is_yearly: "0",
    };
  
    switch (isRepeated) {
      case "0":
        flags.is_daily = "0";
        break;
      case "1":
        flags.is_daily = "1";
        break;
      case "2":
        flags.is_weekly = "1";
        break;
      case "3":
        flags.is_monthly = "1";
        break;
      case "4":
        flags.is_yearly = "1";
        break;
      default:
        throw new Error(`Invalid is_repeated value: ${isRepeated}`);
    }
  
    return flags;
  };
  
  // is_repeated 값으로 반복 플래그 생성
  const repeatedFlags = generateRepeatedFlags(firstData.is_repeated);

  const handleSubmit = async () => {
    const finalData = {
      start_time: firstData.start_time, // firstData에서 start_time 그대로 포함
      end_time: firstData.end_time,
      ...repeatedFlags,
      title: isCustomTitle ? customTitle : title,
      category_id: String(categoryId),
      target_users: targetUsers,
      memo,
    };

    try {
      console.log(finalData);
      const response = await apiClient.post("/sch_requests/register/", finalData);
      console.log("Success:", response.data);
      navigate("/Home"); // 성공 후 이동
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="detail-works-container">
      <div className="sec-title1"><strong>카테고리</strong>를 선택해 주세요.</div>
      <div className="category-section">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-button ${categoryId === cat.id ? "active" : ""}`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            <img src={cat.image} alt={cat.name} />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      {categoryId && (
        <div className="details-section">
          <div className="sec-title2"><strong>세부 업무</strong>를 지정해주세요</div>
          {categories.find((cat) => cat.id === categoryId).details.map((detail) => (
            <button
              key={detail.name}
              className={`detail-button ${title === detail.name ? "active" : ""}`}
              onClick={() => handleDetailSelect(detail.name)}
            >
              <img src={detail.image} alt={detail} />
              <span>{detail.name}</span>
            </button>
          ))}
          {isCustomTitle && (
            <input
              className="detail-input"
              type="text"
              maxLength="15"
              placeholder="상세 업무를 입력하세요"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
            />
          )}
        </div>
      )}
      <div className="sec-title2"><strong>누구의</strong> 일정인가요?</div>
      <div className="user-selection-section">
        {availableUsers.map((user) => (
          <button
            key={user.user_id}
            className={`user-button ${targetUsers.includes(user.user_id) ? "active" : ""}`}
            onClick={() => handleUserSelect(user.user_id)}
          >
            <img src={user.profile_img} alt={user.nickname} width="50px" height="50px" />
            <span className="selected-fam">{user.nickname}</span>
          </button>
        ))}
      </div>
      <div className="sec-title3">추가적으로 남길 메모가 있나요?</div>
      <div className="memo-section">
      <textarea
          className="memo-input"
          placeholder="메모를 입력하세요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <button className="submit-button2" onClick={handleSubmit}>
        요청하기
      </button>
    </div>
  )};

  export default DetailWorks;
