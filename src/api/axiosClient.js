/* 토큰 상태 관리를 위한 유틸 */
/* import apiClient from "./axiosClient"; 경로 확인하고 각 페이지에서 import 하면 됨 */
/* 요청 시 AutAuthorization HEADER 에 자동으로 Bearer access_token 을 달아줌 */

import axios from "axios";

const apiClient = axios.create({
  baseURL: "<백엔드배포주소>",
  /* 우리는 토큰 방식이라 일단 필요한지 고민중 withCredentials: true, // 쿠키 및 인증 정보를 요청에 포함 */
});

// 요청 인터셉터: Authorization 헤더 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token"); // Access Token 가져오기
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* 사용 여부 고민중인 함수-구현 잘 하면 unveil 하겠음
// 응답 인터셉터: Access Token 만료 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Refresh Token으로 새로운 Access Token 요청
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post("<백엔드배포주소>/accounts/token/refresh/", {
            refresh_token: refreshToken,
          });
          const newAccessToken = response.data.access_token;

          // 새로운 Access Token 저장
          localStorage.setItem("access_token", newAccessToken);

          // 실패한 요청에 새로운 Access Token으로 다시 요청
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient.request(error.config);
        } catch (refreshError) {
          console.error("Refresh Token이 만료되었습니다. 재로그인이 필요합니다.");
          localStorage.clear(); // 모든 토큰 삭제
          window.location.href = "/Login"; // 로그인 페이지로 이동
        }
      }
    }
    return Promise.reject(error);
  }
);
*/

export default apiClient;
