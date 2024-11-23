import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from '../../api/api'; // API 인스턴스 임포트

const AdContainer = styled.div`
    display: flex; /* 플렉스 박스 사용 */
    overflow: hidden; /* 넘치는 부분 숨기기 */
    background-color: rgba(243, 243, 243, 0.60);
    border-radius: 15px; 
    padding: 10px; /* 내부 여백 */
    width: 300px; 
    position: relative; /* 상대 위치 설정 */
`;

const AdImage = styled.img`
    width: 296px; 
    height: 167px;
    object-fit: cover; /* 비율 유지하며 잘림 */
    border-radius: 10px; 
    margin-right: 10px; /* 광고 간 여백 */
`;

const LoadingText = styled.span`
    text-align: center;
    width: 100%; /* 중앙 정렬을 위해 전체 너비 사용 */
`;

const ErrorText = styled.span`
    color: red; /* 에러 메시지 색상 */
    text-align: center;
    width: 100%; /* 중앙 정렬을 위해 전체 너비 사용 */
`;

function MainAd() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 광고 인덱스

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await api.get('/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`, // 필요 시 토큰 추가
                    }
                });
                console.log(response.data); // 응답 데이터 확인
                const adData = response.data.ad || []; // 광고 데이터 추출
                setAds(adData); // 상태 업데이트
            } catch (error) {
                console.error('Failed to fetch ads:', error);
                setError('광고를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchAds();
    }, []); // 컴포넌트가 마운트될 때 한 번만 호출

    useEffect(() => {
        if (ads.length === 0) return; // ads가 비어있으면 슬라이드 전환 중지

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length); // 인덱스 증가
        }, 3000); // 3초마다 전환

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [ads]); // ads가 변경될 때만 실행

    if (loading) {
        return <LoadingText>로딩 중...</LoadingText>; // 로딩 상태 표시
    }

    if (error) {
        return <ErrorText>{error}</ErrorText>; // 에러 메시지 표시
    }

    return (
        <AdContainer>
            {ads.length > 0 && (
                <AdImage src={ads[currentIndex]?.place_img} alt={`Advertisement ${currentIndex + 1}`} />
            )}
        </AdContainer>
    );
}

export default MainAd;
