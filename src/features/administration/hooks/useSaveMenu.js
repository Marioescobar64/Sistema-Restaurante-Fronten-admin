import { useMenuStore } from "../../users/store/menuStore";

export const useSaveMenu = () => {
  const createMenuItem = useMenuStore((state) => state.createMenuItem);
  const updateMenuItem = useMenuStore((state) => state.updateMenuItem);

  const saveMenu = async (data, menuId = null) => {
    // Verificar si realmente hay un archivo nuevo
    const hasPhoto = data.photo instanceof FileList
      ? data.photo.length > 0
      : Array.isArray(data.photo)
        ? data.photo.length > 0
        : false;

    if (hasPhoto) {
      // Con imagen: usar FormData
      const formData = new FormData();
      formData.append("saucerName", data.saucerName?.trim());
      formData.append("name",       data.saucerName?.trim());
      formData.append("categoryType", data.categoryType);
      formData.append("price",      Number(data.price));
      formData.append("description", data.description);
      formData.append("isActive",   true);
      formData.append("photo",      data.photo[0]);

      if (menuId) {
        await updateMenuItem(menuId, formData);
      } else {
        await createMenuItem(formData);
      }
    } else {
      // Sin imagen: JSON plano, sin campo photo
      const payload = {
        saucerName:   data.saucerName?.trim(),
        name:         data.saucerName?.trim(),
        categoryType: data.categoryType,
        price:        Number(data.price),
        description:  data.description,
        isActive:     true,
      };

      if (menuId) {
        await updateMenuItem(menuId, payload);
      } else {
        await createMenuItem(payload);
      }
    }
  };

  return { saveMenu };
};