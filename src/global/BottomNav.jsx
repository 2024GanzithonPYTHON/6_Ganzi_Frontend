import React, {useState} from "react";
import "./BottomNav.css";
import {Link} from "react-router-dom";

// 화살표함수형

const BottomNav = () => {
    return(
        <nav className = "wrapper">
            <button>
                {/* 얘만 이미지에 뒷배경 있음 . svg 해도 마찬가지*/}
                <img src = "src\assets\Global\BottomNav\mycalendar.svg" alt = "내 캘린더"/>
                <br/>
                내 캘린더
            </button> 

            <button>
                <img src = "src\assets\Global\BottomNav\fam_cal.svg" alt = "가족 캘린더"/>
                <br/>
                가족 캘린더
            </button>

            <button>
                <img src = "src\assets\Global\BottomNav\home.svg" alt = "홈"/>
                <br/>
                홈
            </button>

            <button className = "smaller-text">
                <img src = "src\assets\Global\BottomNav\register.svg" alt = "캘린더등록"/>
                <br/>
                가족일정 등록
            </button>

            <button>
                <img src = "src\assets\Global\BottomNav\profile.svg" alt = "프로필"/>
                <br/>
                내 프로필
            </button>
        </nav>
    );
};

export default BottomNav;