import { create } from "zustand";
import { axiosAdmin } from "../../../shared/api/api";

const STORAGE_KEY = "adminUsers";
const STAFF_ROLES = ["GERENTE_ROLE", "CHEF_ROLE", "MESERO_ROLE"];

const normalizeUser = (user) => ({
  ...user,
  _id: user._id || user.id,
  nombre: user.nombre || user.name || "",
  email: user.email || "",
  rol: user.rol || "",
  apellido: user.apellido || "",
  cargo: user.cargo || "",
});

const loadAdminUsers = () => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch {
    return [];
  }
};

const saveAdminUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignored
  }
};

export const useAdminUserStore = create((set) => ({
  adminUsers: [],
  loading: false,
  error: null,

  getAdminUsers: async () => {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosAdmin.get("/users", { params: { isActive: true } });
      const backendUsers = (data?.data || [])
        .filter((user) => STAFF_ROLES.includes(user.rol))
        .map(normalizeUser);

      const storedUsers = loadAdminUsers();
      const mergedUsers = [
        ...backendUsers,
        ...storedUsers.filter((user) => !backendUsers.some((backendUser) => backendUser._id === user._id)),
      ];

      saveAdminUsers(mergedUsers);
      set({ adminUsers: mergedUsers, loading: false });
    } catch (error) {
      const storedUsers = loadAdminUsers();
      set({ adminUsers: storedUsers, error: "Error al cargar usuarios del personal", loading: false });
    }
  },

  createAdminUser: async (user) => {
    try {
      set({ loading: true, error: null });
      const payload = {
        nombre: user.nombre,
        email: user.email,
        password: user.password || "Password123!",
        rol: user.rol,
      };

      const { data } = await axiosAdmin.post("/auth/register-employee", payload);
      const createdUser = normalizeUser(data?.data || { ...payload, _id: String(Date.now()) });
      const storedUsers = loadAdminUsers();
      const nextUsers = [createdUser, ...storedUsers.filter((storedUser) => storedUser._id !== createdUser._id)];
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al crear usuario del personal", loading: false });
      throw error;
    }
  },

  updateAdminUser: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const storedUsers = loadAdminUsers();
      const nextUsers = storedUsers.map((user) =>
        user._id === id ? { ...user, ...updates } : user
      );
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al actualizar usuario del personal", loading: false });
      throw error;
    }
  },

  deleteAdminUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const storedUsers = loadAdminUsers();
      const nextUsers = storedUsers.filter((user) => user._id !== id);
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al eliminar usuario del personal", loading: false });
      throw error;
    }
  },
}));
