import { create } from "zustand";

const STORAGE_KEY = "adminUsers";

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

export const useAdminUserStore = create((set, get) => ({
  adminUsers: [],
  loading: false,
  error: null,

  getAdminUsers: async () => {
    try {
      set({ loading: true, error: null });
      const adminUsers = loadAdminUsers();
      set({ adminUsers, loading: false });
    } catch (error) {
      set({ error: "Error al cargar usuarios administrativos", loading: false });
    }
  },

  createAdminUser: async (user) => {
    try {
      set({ loading: true, error: null });
      const adminUsers = loadAdminUsers();
      const nextUsers = [
        ...adminUsers,
        { ...user, _id: String(Date.now()), createdAt: new Date().toISOString() },
      ];
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al crear usuario administrativo", loading: false });
      throw error;
    }
  },

  updateAdminUser: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const adminUsers = loadAdminUsers();
      const nextUsers = adminUsers.map((user) =>
        user._id === id ? { ...user, ...updates } : user
      );
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al actualizar usuario administrativo", loading: false });
      throw error;
    }
  },

  deleteAdminUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const adminUsers = loadAdminUsers();
      const nextUsers = adminUsers.filter((user) => user._id !== id);
      saveAdminUsers(nextUsers);
      set({ adminUsers: nextUsers, loading: false });
    } catch (error) {
      set({ error: "Error al eliminar usuario administrativo", loading: false });
      throw error;
    }
  },
}));
