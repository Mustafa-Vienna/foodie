import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const axiosReq = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor for token management
axiosReq.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosReq;
