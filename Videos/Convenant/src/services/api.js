
// import axios from "axios";
// import AuthService from "../services/authService.js";

// // Create axios instance
// const API = axios.create({
//   baseURL: "https://staging.uridiumworks.com/cmfb.account.api/api/",
//   headers: { "Content-Type": "application/json" },
// });

// let isRefreshing = false;
// let refreshSubscribers = [];

// const subscribeTokenRefresh = (cb) => {
//   refreshSubscribers.push(cb);
// };

// const onRefreshed = (token) => {
//   refreshSubscribers.forEach((cb) => cb(token));
//   refreshSubscribers = [];
// };

// const logout = async () => {
//   try {
//     await AuthService.loginOut().catch(() => {});
//   } finally {
//     localStorage.clear();
//     window.location.href = "/";
//   }
// };

// const getToken = async () => {
//   let token = localStorage.getItem("token");
//   if (!token) return null;

//   const loginTime = parseInt(localStorage.getItem("loginTime") || "0", 10);
//   const expiresIn = parseInt(localStorage.getItem("expiresIn") || "0", 10);
//   const elapsed = Math.floor((Date.now() - loginTime) / 1000);

//   // Refresh if less than 5 min left
//   if (expiresIn && expiresIn - elapsed < 300) {
//     if (!isRefreshing) {
//       isRefreshing = true;
//       try {
//         const newToken = await AuthService.refreshToken();
//         console.log("Refreshed token:", newToken);
//         isRefreshing = false;

//         if (!newToken) {
//           await logout();
//           return null;
//         }

//         token = newToken;
//         onRefreshed(token);
//       } catch (err) {
//         isRefreshing = false;
//         await logout();
//         return null;
//       }
//     } else {
//       // Wait for ongoing refresh
//       token = await new Promise((resolve) => subscribeTokenRefresh(resolve));
//     }
//   }

//   return token;
// };

// // Attach token to every request
// API.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

// // export default API;


import axios from "axios";
import AuthService from "./authService";

const API = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses as fallback
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    // Only refresh if 401 AND message indicates token expired
    if (status === 401 && message.toLowerCase().includes("The token has expired")) {
      try {
        const newToken = await AuthService.refreshToken();
        if (newToken) {
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return API(error.config); // retry original request
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);


export default API;

