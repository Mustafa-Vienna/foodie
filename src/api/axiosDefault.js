import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const axiosReq = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosReq.interceptors.request.use((config) => {
  const storedToken = JSON.parse(localStorage.getItem("currentUser"));
  const token = storedToken?.key;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const axiosRes = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export default axios;
