import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-34-78-66.ap-northeast-2.compute.amazonaws.com/', // 여기에 실제 API의 base URL을 입력하세요
});

export default api;