import { getRefreshTokenFromCookie } from "@src/utils/Auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("accessTokenFlash");
//     debugger;
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(
  (config) => {
    // DEV ONLY: Hardcoded token for debugging applicants API
    const devToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NjdiMmZiMC1lYzlkLTQyYWQtOTI1Ny1kY2RmZWFhMDIzZTUiLCJzdWIiOiJocmRvdHJlY3J1aXRtZW50IiwiVXNlcklkIjoiMSIsIk5hbWUiOiJIUiBBZG1pbmlzdHJhdG9yICIsIm5iZiI6MTc0NzM1NjgwNywiZXhwIjoxNzQ3NDAxODA3LCJpYXQiOjE3NDczNTY4MDcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDIifQ.G-VjsBdUP-ZpgKZr5bujs_bataYqWiXMzxHZoxGDDUQ"

    // Prefer hardcoded token only in development
    const isDev = import.meta.env.MODE === "development";

    const token = isDev
      ? devToken
      : sessionStorage.getItem("accessTokenFlash");

    if (token) {
      config.headers["Authorization"] = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
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
