import { useProductStore } from "../../users/store/productStore"; // Tu Store de productos recién creado

export const useSaveProduct = () => {
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const saveProduct = async (data, productId = null) => {

    // 1. Construir el payload final estructurado en ESPAÑOL sin fotos
    // Aseguramos que los tipos de datos coincidan perfectamente con tu Mongoose Schema
    const payload = {
      nombre: (data.nombre || data.name || "").trim(),
      descripcion: (data.descripcion || data.description || "").trim(),
      precio: Number(data.precio || data.price || 0), // Aseguramos formato numérico
      categoria: (data.categoria || data.category || "").trim(),
    };

    // 2. Crear o actualizar enviando el JSON plano (sin FormData ya que no hay fotos)
    if (productId) {
      await updateProduct(productId, payload);
    } else {
      await createProduct(payload);
    }
  };

  return { saveProduct };
};