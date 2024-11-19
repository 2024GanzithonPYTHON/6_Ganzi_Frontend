import Calendar from "./Calendar";


function FamilyRecord() {
    const handleDateSelect = (date) => {
        console.log('가족 일정 기록: ', date);
        // 예시입니당~ 이런식으로 handle을 관리하면 될 것 같아요
    };

    return (
        <div>
            <h2>가족 일정 기록</h2>
            <Calendar onDateSelect={handleDateSelect} />
           
        </div>
    );
}

export default FamilyRecord;