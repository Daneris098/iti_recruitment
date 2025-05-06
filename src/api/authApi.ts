// authApi.ts
import axios from "axios";

const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
});

authApi.interceptors.request.use(
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

export default authApi;