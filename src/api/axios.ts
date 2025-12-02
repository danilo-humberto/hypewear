import axios from "axios";
import { getClientData } from "@/utils/storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userData = getClientData("client");
  if (userData?.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

export const setupResponseInterceptor = (logoutUser: () => void) => {
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response ? error.response.status : null;

      if (status === 401 || status === 403) {
        logoutUser(); 
      }
      return Promise.reject(error);
    }
  );
};

export default api;