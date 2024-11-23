import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://flan.klr.kr",
  withCredentials: true, // 모든 요청에 쿠키를 포함
});

export default axiosInstance;