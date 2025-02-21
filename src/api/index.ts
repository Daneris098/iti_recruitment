import { getRefreshTokenFromCookie } from "@src/utils/Auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}api/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessTokenFlash");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshTokenFromCookie();
        if (refreshToken) {
          sessionStorage.setItem("accessTokenFlash", refreshToken);
          originalRequest.headers["Authorization"] = refreshToken;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
