import { authEvents } from "@/utils/authEvents";
import { getClientData } from "@/utils/storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const storedClient = getClientData("client");

      if (storedClient) {
        const parsedClient =
          typeof storedClient === "string"
            ? JSON.parse(storedClient)
            : storedClient;

        if (parsedClient.access_token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${parsedClient.access_token}`;
        }
      }
    } catch {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401) ||
      error.response.status === 403
    ) {
      authEvents.emitSessionExpired();
    }

    return Promise.reject(error);
  }
);

export default api;
