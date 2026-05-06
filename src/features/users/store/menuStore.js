import { create } from "zustand";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deactivateMenuItem,
} from "../../../shared/api/admin.js";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useMenuStore = create((set, get) => ({
  menuItems: [],   // 🔥 estado para platillos
  loading: false,
  error: null,

  // ✅ GET
  getMenuItems: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getMenuItems();

      set({
        menuItems: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener platillos",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createMenuItem: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createMenuItem(formData);

      await get().getMenuItems(); // 🔥 recargar lista

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear platillo");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateMenuItem: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      await updateMenuItem(id, formData);

      await get().getMenuItems(); // 🔥 recargar lista

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar platillo");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DEACTIVATE (soft delete)
  deactivateMenuItem: async (id) => {
    try {
      set({ loading: true, error: null });

      await deactivateMenuItem(id);

      await get().getMenuItems(); // 🔥 recargar lista ya que es soft delete

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al desactivar platillo");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));