import React, {useState} from "react";
import "./BottomNav.css";
import {Link} from "react-router-dom";

// 화살표함수형
const BottomNav = () => {
    return(
        <nav className = "wrapper">
            <button>button1</button> {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
            <button>button2</button>
            <button>button3</button>
            <button>button4</button>
            <button>button5</button>
        </nav>
    );
};

export default BottomNav;