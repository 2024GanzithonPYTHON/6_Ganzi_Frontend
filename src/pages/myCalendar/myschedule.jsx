import WeekCalendar from "./myweek";
import React from 'react';
import MySchedulelist from "./myschedulelist";
import NewAddButton from "./newaddbutton";

function MyWeek(){

    return (
        <div>
          <h1>주간 달력</h1>
          <WeekCalendar />
          <MySchedulelist/>
          <NewAddButton/>
        </div>
      );
    };

export default MyWeek;