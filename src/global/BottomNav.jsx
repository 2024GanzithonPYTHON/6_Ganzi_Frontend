import React, {useState} from "react";
import "./BottomNav.css";
import {Link} from "react-router-dom";

// 화살표함수형 사용

const BottomNav = () => {
    return(
        <nav className = "wrapper">
            <Link to="/MyWeek" className="nav-button">
                <img src="/assets/Global/BottomNav/mycalendar.svg" alt="내 캘린더" />

                <br/>
                내 캘린더
            </Link>

            <Link to="/FamilyCalendar" className="nav-button">
                    <img src = "public\assets\Global\BottomNav\fam_cal.svg" alt = "가족 캘린더"/>
                    <br/>
                    가족 캘린더
            </Link>

            <Link to="/" className="nav-button">
                <img src = "public\assets\Global\BottomNav\home.svg" alt = "홈"/>
                <br/>
                홈
            </Link>

            <Link to="/" className="nav-button">
            <img src="public/assets/Global/BottomNav/register.svg" alt="캘린더등록" />
            <br />
            <div className="smaller-text">가족일정 등록</div> {/* 작은 텍스트 클래스 적용 */}
            </Link>

            <Link to="/MyPage" className="nav-button">
                <img src = "public\assets\Global\BottomNav\profile.svg" alt = "프로필"/>
                <br/>
                내 프로필
            </Link>
        </nav>
    );
};

export default BottomNav;