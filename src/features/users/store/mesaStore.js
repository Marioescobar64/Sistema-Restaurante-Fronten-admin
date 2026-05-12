import { create } from "zustand";
import {
  getTables as getTableseRequest,
  createTable as createTableRequest,
  updateTable as updateTableRequest,
  deactivateTable as deactivateTableRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useTableStore = create((set, get) => ({
  tables: [],   // 🔥 nombre correcto
  loading: false,
  error: null,

  // ✅ GET
  getTables: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getTableseRequest();

      set({
        tables: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener mesas",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createTable: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createTableRequest(formData);

      await get().getTables(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear mesa");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateTable: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      await updateTableRequest(id, formData);

      await get().getTables(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar mesa");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DELETE
  deleteTable: async (id) => {
    try {
      set({ loading: true, error: null });

      await deactivateTableRequest(id); // 🔥 ahora sí existe

      set({
        tables: get().tables.filter((t) => t._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al eliminar mesa");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));