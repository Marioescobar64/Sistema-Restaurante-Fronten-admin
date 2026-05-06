import { axiosAuth } from "./api";

// ================= AUTH =================
export const login = async (data) => axiosAuth.post("/auth/login", data);
export const logout = async () => axiosAuth.post("/auth/logout");

export const refreshToken = async (refreshToken) =>
    axiosAuth.post("/auth/refresh", { refreshToken });

export const register = async (data) =>
    axiosAuth.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const forgotPassword = async (email) =>
    axiosAuth.post("/auth/forgot-password", { email });

export const resetPassword = async (token, newPassword) =>
    axiosAuth.post("/auth/reset-password", { token, newPassword });

export const verifyEmail = async (token) =>
    axiosAuth.post("/auth/verify-email", { token });

// ================= USERS =================
export const updateUserRole = async (userId, roleName) =>
    axiosAuth.put(`/auth/users/${userId}/role`, { roleName });

export const getAllUsers = async () => {
    const { data } = await axiosAuth.get("/auth/users");
    return { users: data };
};