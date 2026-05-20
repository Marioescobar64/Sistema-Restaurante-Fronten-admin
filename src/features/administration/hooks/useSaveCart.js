import { useCartStore } from "../../users/store/cartStore";

export const useSaveCart = () => {
  const createCart = useCartStore((state) => state.createCart);
  const updateCart = useCartStore((state) => state.updateCart);
  const calculateCartTotal = useCartStore((state) => state.calculateCartTotal);

  const saveCart = async (data, cartId = null) => {
    const validStatuses = ["activo", "confirmado", "cancelado"];
    const status = validStatuses.includes(data.status) ? data.status : "activo";

    const payload = {
      status,
      items: (data.items || []).map((item) => ({
        menuItem: item.menuItem?._id || item.menuItem || item._id,
        quantity: Number(item.quantity),
        price:    Number(item.price || item.precio || 0),
        subtotal: Number(item.price || item.precio || 0) * Number(item.quantity),
      })),
      total: data.total || 0,
    };

    // Solo incluir orderId si es un valor real (no vacío, no null)
    if (data.orderId && String(data.orderId).trim() !== "") {
      payload.orderId = data.orderId;
    }

    if (cartId) {
      await updateCart(cartId, payload);
    } else {
      await createCart(payload);
    }
  };

  return { saveCart, calculateCartTotal };
};