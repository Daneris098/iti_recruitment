// useAxios.tsx
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://161.49.161.52:7321",
  headers: {
    Accept: "text/plain",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Reusable Axios Fetching with Interceptors & Instance
const connect = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  type: string,
  cookie?: string,
  data?: unknown
): Promise<AxiosResponse<unknown>> => {
  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: {
      "Content-Type": type,
      Cookie: cookie ? cookie : undefined,
    },
    timeout: 10000,
    data: data ? data : undefined,
  };

  return axiosInstance(config);
};

export { connect, axiosInstance };
