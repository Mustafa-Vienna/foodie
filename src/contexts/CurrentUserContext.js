import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        const { data } = await axiosRes.get('dj-rest-auth/user/');
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
      }
    } catch (err) {
      console.log("Error fetching user: ", err);
      setCurrentUser(null);
    }
  }

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setCurrentUser((prevUser) => {
            if (prevUser) {
              navigate("/signin");
            }
            return null;
          });
          localStorage.removeItem("currentUser");
          return Promise.reject(err);
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/refresh/");
          } catch (refreshErr) {
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            navigate("/signin");
          }
          return Promise.reject(err);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
        </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
};