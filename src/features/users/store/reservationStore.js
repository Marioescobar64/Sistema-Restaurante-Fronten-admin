import { create } from "zustand";
import {
  getReservations as getReservationsRequest,
  createReservation as createReservationRequest,
  updateReservation as updateReservationRequest,
  changeReservationStatus as changeReservationStatusRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useReservationStore = create((set, get) => ({
  reservations: [], // ✅ Estado inicial seguro
  loading: false,
  error: null,

  // ✅ GET
  getReservations: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getReservationsRequest();

      // 🔥 SOLUCIÓN DE RAÍZ: Evitar que asigne undefined si la API no devuelve la estructura esperada
      const fetchedReservations = response?.data?.data || response?.data || [];

      set({
        // Aseguramos que siempre sea un array
        reservations: Array.isArray(fetchedReservations) ? fetchedReservations : [],
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener reservaciones",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createReservation: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createReservationRequest(formData);

      await get().getReservations();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear reservación");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateReservation: async (reservationId, formData) => {
    try {
      set({ loading: true, error: null });

      await updateReservationRequest(reservationId, formData);

      await get().getReservations();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Error al actualizar reservación"
      );
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ CHANGE STATUS
  changeStatus: async (reservationId, status) => {
    try {
      set({ loading: true, error: null });

      await changeReservationStatusRequest(reservationId, status);

      await get().getReservations();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Error al cambiar estado de la reservación"
      );
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));