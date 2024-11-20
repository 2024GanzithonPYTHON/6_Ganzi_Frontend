import React, {useState} from "react";
import "./BottomNav.css";
import {Link} from "react-router-dom";

// 화살표함수형 사용

const BottomNav = () => {
    return(
        <nav className = "wrapper">
            <Link to="/" className="nav-button">
            <button>
                {/* 얘만 이미지에 뒷배경 있음 . svg 해도 마찬가지*/}
                <img src = "src\assets\Global\BottomNav\mycalendar.svg" alt = "내 캘린더"/>
                <br/>
                내 캘린더
            </button> 
            </Link>

            <Link to="/FamilyCalendar" className="nav-button">
                <button>
                    <img src = "src\assets\Global\BottomNav\fam_cal.svg" alt = "가족 캘린더"/>
                    <br/>
                    가족 캘린더
                </button>
            </Link>

            <Link to="/" className="nav-button">
            <button>
                <img src = "src\assets\Global\BottomNav\home.svg" alt = "홈"/>
                <br/>
                홈
            </button>
            </Link>

            <Link to="/" className="nav-button">
            <button className = "smaller-text">
                <img src = "src\assets\Global\BottomNav\register.svg" alt = "캘린더등록"/>
                <br/>
                가족일정 등록
            </button>
            </Link>

            <Link to="/MyPage" className="nav-button">
            <button>
                <img src = "src\assets\Global\BottomNav\profile.svg" alt = "프로필"/>
                <br/>
                내 프로필
            </button>
            </Link>
        </nav>
    );
};

export default BottomNav;