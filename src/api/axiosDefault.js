import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const axiosReq = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosReq.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Response interceptor for token refresh
axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          console.log("Attempting to refresh token with:", refreshToken.substring(0, 10) + "...");
          const { data } = await axios.post(`${BASE_API_URL}/dj-rest-auth/token/refresh/`, {
            refresh: refreshToken,
          });
          console.log("Token refreshed successfully:", data.access.substring(0, 10) + "...");
          localStorage.setItem("accessToken", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return axiosReq(originalRequest);
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr.response?.data || refreshErr.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
          return Promise.reject(refreshErr);
        }
      } else {
        console.warn("No refresh token available, redirecting to signin");
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosReq;