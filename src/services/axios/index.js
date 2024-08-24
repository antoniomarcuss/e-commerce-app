import axios from "axios";
import { BASE_URL } from "../../consts";

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("token");
  if (!token) return config;
  const headers = { Authorization: `Bearer ${token}` };
  config.headers = headers;
  return config;
});

const logout = () => {
  const { state } = JSON.parse(localStorage.getItem("auth-storage"));
  localStorage.removeItem("token");
  localStorage.removeItem("auth-storage");
  if (state.user && state.user.role.name === "ADMIN") {
    window.location.href = "/admin/login";
    return;
  }
  window.location.href = "/login";
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window === "undefined") return Promise.reject(error);
    if (error.config.url !== "/auth/login" && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
