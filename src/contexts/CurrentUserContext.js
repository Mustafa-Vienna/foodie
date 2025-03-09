import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosReq from "../api/axiosDefault";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
    navigate("/signin");
  }, [navigate]);

  // Handle mounting and checking localStorage for user data
  const handleMount = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("No access token found. Skipping user fetch.");
      setCurrentUser(null);
      return;
    }

    try {
      const { data } = await axiosReq.get("/dj-rest-auth/user/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      localStorage.setItem("currentUser", JSON.stringify(data));
      setCurrentUser(data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();

    // Interceptor for token refresh when 401 error occurs
    const interceptor = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            console.error("No refresh token found. Logging out.");
            logout();
            return Promise.reject(error);
          }

          try {
            const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });

            localStorage.setItem("accessToken", data.access);
            originalRequest.headers.Authorization = `Bearer ${data.access}`;

            return axiosReq(originalRequest);
          } catch (refreshErr) {
            console.error("Token refresh failed. Logging out.", refreshErr);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axiosReq.interceptors.response.eject(interceptor);
  }, [logout]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};