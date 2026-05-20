import { useCartStore } from "../../users/store/cartStore";

export const useSaveCart = () => {
  const createCart = useCartStore((state) => state.createCart);
  const updateCart = useCartStore((state) => state.updateCart);
  const calculateCartTotal = useCartStore((state) => state.calculateCartTotal);

  const saveCart = async (data, cartId = null) => {
    // Mapear estados
    const statusMap = {
      PAGADO: "Pagado",
      PENDIENTE: "Pendiente",
      CANCELADO: "Cancelado",
    };

    const normalize = (text) =>
      (text || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_")
        .trim();

    const normalizedStatusInput = normalize(data.status || data.estado);
    const statusFinal = statusMap[normalizedStatusInput] || "Pendiente";

    // Construir payload con items
    const payload = {
      orderId: (data.orderId || "").trim(),
      status: statusFinal,
      items: data.items || [],
      total: data.total || 0,
    };

    if (cartId) {
      await updateCart(cartId, payload);
    } else {
      await createCart(payload);
    }
  };

  return { saveCart, calculateCartTotal };
};
