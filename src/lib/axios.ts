import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// +  process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.156:4000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const sessionToken = localStorage.getItem("pos_session_token");
      const terminalToken = localStorage.getItem("pos_terminal_token");
      const token = sessionToken || terminalToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Global Error Handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("pos_session_token");
        if (!window.location.pathname.includes("/auth/login")) {
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/auth/login?next=${encodeURIComponent(currentPath)}`;
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
