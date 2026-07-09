import { useOrderStore } from "../../users/store/orderStore";

export const useSaveOrder = () => {
  const createOrder = useOrderStore((state) => state.createOrder);
  const updateOrder = useOrderStore((state) => state.updateOrder);

  const saveOrder = async (data, orderId = null) => {

    // 1. Mapear y normalizar los ESTADOS exactos del ENUM de tu backend:
    // ['Pendiente', 'En proceso', 'Entregado', 'Cancelado']
    const estadoMap = {
      PENDIENTE: "Pendiente",
      EN_PROCESO: "En proceso",
      ENTREGADO: "Entregado",
      CANCELADO: "Cancelado",
    };

    // Función auxiliar para estandarizar el texto recibido del frontend
    const normalize = (text) =>
      (text || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quita acentos
        .replace(/\s+/g, "_")            // Reemplaza espacios por guiones bajos
        .trim();

    const normalizedEstadoInput = normalize(data.estado || data.status);
    const estadoFinal = estadoMap[normalizedEstadoInput] || "Pendiente";

    // 2. Construir el Payload final estructurado en ESPAÑOL sin fotos
    const payload = {
      nombrePedido: (data.nombrePedido || data.orderName || "").trim(),
      descripcion: (data.descripcion || data.description || "").trim(),
      // Si no viene fecha, dejamos que Mongoose asigne Date.now por defecto
      fechaPedido: data.fechaPedido || data.orderDate || new Date().toISOString(),
      total: Number(data.total),
      estado: estadoFinal,
      mesa: data.mesa,
    };

    // 3. CREATE / UPDATE enviando JSON limpio
    if (orderId) {
      await updateOrder(orderId, payload);
    } else {
      await createOrder(payload);
    }
  };

  return { saveOrder };
};