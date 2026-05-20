import { create } from "zustand";
import {
  getCarts as getCartsRequest,
  createCart as createCartRequest,
  updateCart as updateCartRequest,
} from "../../../shared/api";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

export const useCartStore = create((set, get) => ({
  carts: [],
  loading: false,
  error: null,

  // ✅ GET
  getCarts: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getCartsRequest();

      set({
        carts: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Error al obtener carritos",
        loading: false,
      });
    }
  },

  // ✅ CREATE
  createCart: async (formData) => {
    try {
      set({ loading: true, error: null });

      await createCartRequest(formData);

      await get().getCarts();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al crear carrito");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ UPDATE
  updateCart: async (cartId, formData) => {
    try {
      set({ loading: true, error: null });

      await updateCartRequest(cartId, formData);

      await get().getCarts();

      set({ loading: false });
    } catch (error) {
      const message = getApiErrorMessage(error, "Error al actualizar carrito");
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  // ✅ ADD ITEM TO CART (local operation - se sincroniza al guardar)
  addItemToCart: (cartId, item) => {
    set((state) => {
      const updatedCarts = state.carts.map((cart) => {
        if (cart._id === cartId) {
          return {
            ...cart,
            items: [...(cart.items || []), { ...item, quantity: 1 }],
          };
        }
        return cart;
      });
      return { carts: updatedCarts };
    });
  },

  // ✅ REMOVE ITEM FROM CART (local operation)
  removeItemFromCart: (cartId, itemId) => {
    set((state) => {
      const updatedCarts = state.carts.map((cart) => {
        if (cart._id === cartId) {
          return {
            ...cart,
            items: (cart.items || []).filter((item) => item._id !== itemId),
          };
        }
        return cart;
      });
      return { carts: updatedCarts };
    });
  },

  // ✅ UPDATE ITEM QUANTITY
  updateItemQuantity: (cartId, itemId, quantity) => {
    set((state) => {
      const updatedCarts = state.carts.map((cart) => {
        if (cart._id === cartId) {
          return {
            ...cart,
            items: (cart.items || []).map((item) =>
              item._id === itemId ? { ...item, quantity } : item
            ),
          };
        }
        return cart;
      });
      return { carts: updatedCarts };
    });
  },

  // ✅ CALCULATE TOTAL FOR CART
  calculateCartTotal: (cartId) => {
    const state = get();
    const cart = state.carts.find((c) => c._id === cartId);
    if (!cart || !cart.items) return 0;
    
    return cart.items.reduce((total, item) => {
      const itemTotal = (item.precio || item.price || 0) * (item.quantity || 0);
      return total + itemTotal;
    }, 0);
  },
}));
