import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefault";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const LogoutContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useLogout = () => useContext(LogoutContext);

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
      const { data } = await axiosReq.get("/dj-rest-auth/user/");
      localStorage.setItem("currentUser", JSON.stringify(data));
      setCurrentUser(data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <LogoutContext.Provider value={logout}>
          {children}
        </LogoutContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};