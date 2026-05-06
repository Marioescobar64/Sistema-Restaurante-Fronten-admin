import { create } from "zustand";
import {
  getMaintenanceRecords as getMaintenanceRequest,
  createMaintenanceRecord as createMaintenanceRequest,
  updateMaintenanceRecord as updateMaintenanceRequest,
  deleteMaintenanceRecord as  deleteAdministrationRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    const joined = data.errors
      .map((item) => item?.msg || item?.message || item?.path)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  if (Array.isArray(data?.details) && data.details.length > 0) {
    const joined = data.details
      .map((item) => item?.message || item?.msg || item)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (Array.isArray(data?.error) && data.error.length > 0) {
    const joined = data.error
      .map((item) => item?.message || item?.msg || item?.field)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  return fallbackMessage;
};
 
export const useMaintenanceStore = create((set, get) => ({
  administrations: [],
  loading: false,
  error: null,
 
  getAdministrations: async () => {
    try {
      set({ loading: true, error: null });
 
      const response = await getMaintenanceRequest();
 
      set({
        administrations: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al obtener mantenimientos",
        loading: false,
      });
    }
  },
 
  createMaintenance: async (formData) => {
    try {
      set({ loading: true, error: null });
 
      await createMaintenanceRequest(formData);
      // Refrescar lista para obtener la ruta final de la imagen desde backend
      await get().getMaintenanceRecords ();
      set({ loading: false });
    } catch (error) {
      console.error("[createMaintenance] API error", {
        status: error?.response?.status,
        data: error?.response?.data,
      });
      if (error?.response?.data) {
        console.error(
          "[createMaintenance] API error JSON",
          JSON.stringify(error.response.data, null, 2),
        );
      }
      const message = getApiErrorMessage(error, "Error al crear mantenimiento");
      set({
        loading: false,
        error: message,
      });
      throw new Error(message);
    }
  },

  updateMaintenance: async (id, formData) => {
    try {
      set({ loading: true, error: null });
      await updateMaintenanceRequest(id, formData);
      // Refrescar lista para obtener la ruta final de la imagen desde backend
      await get().getMaintenanceRecords ();
      set({ loading: false });
    } catch (error) {
      console.error("[updateMaintenance] API error", {
        status: error?.response?.status,
        data: error?.response?.data,
      });
      if (error?.response?.data) {
        console.error(
          "[updateMaintenance] API error JSON",
          JSON.stringify(error.response.data, null, 2),
        );
      }
      const message = getApiErrorMessage(error, "Error al actualizar mantenimiento");
      set({
        loading: false,
        error: message,
      });
      throw new Error(message);
    }
  },

  deleteMaintenance: async (id) => {
    try {
      set({ loading: true, error: null });

      await deleteMaintenanceRequest(id);

      set({
        administrations: get().administrations.filter((admin) => admin._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al eliminar mantenimiento   ");
      set({
        loading: false,
        error: message,
      });
      throw new Error(message);
    }
  },
 /*
  getAllReservations: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllReservationsRequest();
      set({
        reservations: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al obtener reservaciones",
        loading: false,
      });
    }
  },
  */
 
 /* confirmReservation: async (id) => {
    try {
      set({ loading: true, error: null });
      await confirmReservationRequest(id);
      // Refrescar lista después de confirmar
      await get().getAllReservations();
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error al confirmar reservación",
        loading: false,
      });
    }
  },
  */

}));