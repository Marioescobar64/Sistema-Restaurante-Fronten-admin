import { create } from "zustand";
import {
  getMaintenanceRecords as getMaintenanceRequest,
  createMaintenanceRecord as createMaintenanceRequest,
  updateMaintenanceRecord as updateMaintenanceRequest,
  deleteMaintenanceRecord as deleteMaintenanceRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useMaintenanceStore = create((set, get) => ({
  maintenances: [],   // 🔥 nombre correcto
  loading: false,
  error: null,

  // ✅ GET
  getMaintenanceRecords: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getMaintenanceRequest();

      set({
        maintenances: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener mantenimientos",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createMaintenance: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createMaintenanceRequest(formData);

      await get().getMaintenanceRecords(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear mantenimiento");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateMaintenance: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      await updateMaintenanceRequest(id, formData);

      await get().getMaintenanceRecords(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar mantenimiento");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DELETE
  deleteMaintenance: async (id) => {
    try {
      set({ loading: true, error: null });

      await deleteMaintenanceRequest(id); // 🔥 ahora sí existe

      set({
        maintenances: get().maintenances.filter((m) => m._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al eliminar mantenimiento");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));