<<<<<<< HEAD
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage (ou de onde você o salvar após o login)
    const token = localStorage.getItem("authToken");
    if (token) {
      // Se o token existir, adiciona no cabeçalho de autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
=======
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
>>>>>>> 42a1f3cbd5db1f33419d4359669e3b3889a17931
