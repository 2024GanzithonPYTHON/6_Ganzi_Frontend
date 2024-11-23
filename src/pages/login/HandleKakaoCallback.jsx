import axiosInstance from "../auth/axiosInstance"; // axiosInstance import

const handleKakaoCallback = async (code) => {
  try {
    // axiosInstance 사용
    const response = await axiosInstance.get(`/accounts/kakao/callback/?code=${code}`);

    if (response.status === 200) {
      console.log("Callback response:", response.data);
      return response.data; // access_token과 refresh_token 반환
    } else {
      console.error("Unexpected response:", response.data);
      throw new Error("Callback failed");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default handleKakaoCallback;
