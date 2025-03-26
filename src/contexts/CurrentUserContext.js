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
      
      // Ensure profile_id is a number and properly set
      if (data && data.profile_id) {
        // Store data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
      } else {
        console.warn("No profile_id found in user data");
        // Try to get profile ID directly if we have a user ID
        if (data && data.pk) {
          try {
            const profileResponse = await axiosReq.get(`/profiles/?author=${data.pk}`);
            if (profileResponse.data.results && profileResponse.data.results.length > 0) {
              const profileId = profileResponse.data.results[0].id;
              data.profile_id = profileId;
              localStorage.setItem("currentUser", JSON.stringify(data));
              setCurrentUser(data);
            }
          } catch (profileErr) {
            console.error("Failed to get profile ID:", profileErr);
            localStorage.setItem("currentUser", JSON.stringify(data));
            setCurrentUser(data);
          }
        } else {
          localStorage.setItem("currentUser", JSON.stringify(data));
          setCurrentUser(data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();
    
    // Debug log to check localStorage
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        console.log("Current user data from localStorage:", parsedData);
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
      }
    }
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