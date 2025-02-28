import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefault";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Handle mounting and checking localStorage for user data
  const handleMount = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setCurrentUser(null);
    navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    handleMount();

    // Interceptor for token refresh when 401 error occurs
    axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If token expired, refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");

          if (refreshToken) {
            try {
              const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
              localStorage.setItem("accessToken", data.access);
              originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

              return axiosReq(originalRequest);
            } catch (refreshErr) {
              console.error("Error refreshing token", refreshErr);
              // Clear tokens and redirect to the signin
              logout();
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, logout]); // Ensure `logout` is updated and in dependencies

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};