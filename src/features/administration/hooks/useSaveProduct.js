import { useProductStore } from "../../users/store/productStore";

export const useSaveProduct = () => {
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const saveProduct = async (data, productId = null) => {
    const payload = {
      nombre:           String(data.nombre || "").trim(),
      cantidad:         parseFloat(data.cantidad),
      cantidadObtenida: parseFloat(data.cantidadObtenida),
      precio:           parseFloat(data.precio),
      fechaExp:         new Date(data.fechaExp).toISOString(),
      descripcion:      String(data.descripcion || "").trim(),
      categoria:        String(data.categoria || "").trim(),
    };

    if (productId) {
      await updateProduct(productId, payload);
    } else {
      await createProduct(payload);
    }
  };

  return { saveProduct };
};