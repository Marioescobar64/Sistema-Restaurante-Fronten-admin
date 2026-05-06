import { useMenuStore } from "../../users/store/menuStore";

export const useSaveMenu = () => {
  const createMenuItem = useMenuStore((state) => state.createMenuItem);
  const updateMenuItem = useMenuStore((state) => state.updateMenuItem);

  const saveMenu = async (data, menuId = null) => {
    // 🔹 Payload final correcto para menú
    const payload = {
      saucerName: data.saucerName,
      categoryType: data.categoryType,
      price: Number(data.price),
      description: data.description,
      isActive: true,  // 🔥 Agregar isActive
    };

    let body = payload;

    const hasPhoto = data.photo?.length > 0;

    // 🔹 Manejo de imagen (igual que fields)
    if (hasPhoto) {
      const formData = new FormData();

      formData.append("saucerName", payload.saucerName);
      formData.append("categoryType", payload.categoryType);
      formData.append("price", payload.price);
      formData.append("description", payload.description);
      formData.append("isActive", payload.isActive);  // 🔥 Incluir en FormData

      formData.append("photo", data.photo[0]);

      body = formData;
    }

    // 🔹 CREATE / UPDATE
    if (menuId) {
      await updateMenuItem(menuId, body);
    } else {
      await createMenuItem(body);
    }
  };

  return { saveMenu };
};