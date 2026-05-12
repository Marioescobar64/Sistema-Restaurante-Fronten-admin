import { create } from "zustand";
import {
  getProducts as getProductsRequest,
  createProduct as createProductRequest,
  updateProduct as updateProductRequest,
  deactivateProduct as deactivateProductRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useProductStore = create((set, get) => ({
  products: [],   // 🔥 nombre correcto
  loading: false,
  error: null,

  // ✅ GET
  getProducts: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getProductsRequest();

      set({
        products: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener productos",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createProduct: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createProductRequest(formData);

      await get().getProducts(); // 🔥 recarga la lista de productos

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear producto");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateProduct: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      await updateProductRequest(id, formData);

      await get().getProducts(); // 🔥 recarga la lista de productos

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar producto");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ DELETE (Desactivar)
  deleteProduct: async (id) => {
    try {
      set({ loading: true, error: null });

      await deactivateProductRequest(id); // 🔥 consumo de tu endpoint de desactivación

      set({
        products: get().products.filter((p) => p._id !== id),
        loading: false,
      });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al eliminar producto");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },
}));