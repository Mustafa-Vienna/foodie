import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

// Create axios instance for requests
export const axiosReq = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent in requests
});

// Create axios instance for refreshing tokens
const axiosRefresh = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for sending refresh tokens
});

// Function to logout user and clear storage
const logoutUser = () => {
  console.warn("Logging out user...");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.clear(); // Clear session storage
  window.location.href = "/signin"; // Redirect to login page
};

// Request Interceptor: Attach Access Token
axiosReq.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry & Errors
axiosReq.interceptors.response.use(
  (response) => response, // If successful, return response
  async (error) => {
    const originalRequest = error.config;

    // Check if it's an Unauthorized (401) response & not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.warn("No refresh token available, redirecting to login.");
        logoutUser();
        return Promise.reject(error);
      }

      try {
        console.log("Attempting token refresh...");
        const { data } = await axiosRefresh.post("/dj-rest-auth/token/refresh/", {
          refresh: refreshToken,
        });

        console.log("Token refreshed successfully!");
        localStorage.setItem("accessToken", data.access);
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        // Retry the original request with the new token
        return axiosReq(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosReq;
