import axios from "axios";

const API = axios.create({
  baseURL: "https://flynest-school-management.onrender.com",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
