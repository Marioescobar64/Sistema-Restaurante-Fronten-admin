import { create } from "zustand";
import {
  getOrders as getOrdersRequest,
  createOrder as createOrderRequest,
  updateOrder as updateOrderRequest,
  deactivateOrder as deactivateOrderRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useOrderStore = create((set, get) => ({
  orders: [],   // 🔥 nombre correcto
  loading: false,
  error: null,

  // ✅ GET
  getOrders: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getOrdersRequest();

      set({
        orders: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener órdenes",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createOrder: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createOrderRequest(formData);

      await get().getOrders(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear orden");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateOrder: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      await updateOrderRequest(id, formData);

      await get().getOrders(); // 🔥 corregido

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar orden");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DELETE
  deleteOrder: async (id) => {
    try {
      set({ loading: true, error: null });

      await deactivateOrderRequest(id); // 🔥 ahora sí existe

      set({
        orders: get().orders.filter((o) => o._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al eliminar orden");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));