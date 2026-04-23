import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }else {
    delete req.headers.Authorization;
  }

  return req;
});

// 🔥 Handle redirect from backend
// API.interceptors.response.use(
//   (res) => {
//     if (res.data?.redirect) {
//       // Clear local storage
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Redirect to login
//       window.location.href = res.data.redirect;
//     }

//     return res;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

API.interceptors.response.use(
  (res) => {
    if (res.data?.redirect) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = res.data.redirect;
    }
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.post("/auth/refresh", {});

        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);

        API.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest);
        
      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default API;