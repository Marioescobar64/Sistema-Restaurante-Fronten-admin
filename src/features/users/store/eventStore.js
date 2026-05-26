import { create } from "zustand";
import {
  getEvents as getEventsRequest,
  createEvent as createEventRequest,
  updateEvent as updateEventRequest,
  changeEventStatus as changeEventStatusRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useEventStore = create((set, get) => ({
  events: [], // ✅ Estado inicial seguro
  loading: false,
  error: null,

  // ✅ GET
  getEvents: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getEventsRequest();

      // 🔥 SOLUCIÓN DE RAÍZ: Evitar que asigne undefined si la API no devuelve la estructura exacta
      const fetchedEvents = response?.data?.data || response?.data || [];

      set({
        // Aseguramos que siempre sea un array
        events: Array.isArray(fetchedEvents) ? fetchedEvents : [],
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener eventos",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createEvent: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createEventRequest(formData);

      await get().getEvents();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear evento");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateEvent: async (eventId, formData) => {
    try {
      set({ loading: true, error: null });

      await updateEventRequest(eventId, formData);

      await get().getEvents();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar evento");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ CHANGE STATUS
  changeStatus: async (eventId, isActive) => {
    try {
      set({ loading: true, error: null });

      await changeEventStatusRequest(eventId, isActive);

      await get().getEvents();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Error al cambiar estado del evento"
      );
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));