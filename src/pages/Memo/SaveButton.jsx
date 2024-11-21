import styled from 'styled-components';

const StyledButton = styled.button`
    width: 276px;
    height: 43.74px;
    flex-shrink: 0;
    border-radius: 10px;
    border: none;
    background: var(--Linear, linear-gradient(95deg, #F8D785 29.47%, #FFFD8A 72.69%));
    font-size: 14px;
    font-family: "Pretendard Variable";
    cursor: pointer; // 커서 스타일 추가
`;

function SaveButton({ onClick, children }) {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default SaveButton;
