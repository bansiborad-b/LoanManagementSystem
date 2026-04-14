import API from "./axios";

// ✅ Register API
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// ✅ Login API
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Logout API
export const logoutUser = (data) => {
    return API.post("/auth/logout", data)
}