// src/api/axiosClient.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/', // 백엔드 API 기본 URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: Authorization 헤더에 토큰 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 기본 에러 처리
apiClient.interceptors.response.use(
    (response) => {
        // 성공 응답 처리
        return response;
    },
    (error) => {
        const originalRequest = error.config; // 원래 요청 정보
        console.error('API 요청 에러:', error);

        // 401 에러의 기본 처리 (예시)
        if (error.response && error.response.status === 401) {
            console.warn('인증 오류! 다시 로그인해야 합니다.');
            // 원한다면 추가적인 처리를 여기서 구현 가능
        }

        return Promise.reject(error); // 에러를 그대로 반환
    }
);

export default apiClient;