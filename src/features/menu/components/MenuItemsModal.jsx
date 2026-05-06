import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMenuStore } from "../../users/store/menuStore.js";
import { Spinner } from "@material-tailwind/react";
import { useSaveMenu } from "../../administration/hooks/useSaveMenu";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const MenuItemsModal = ({ isOpen, onClose, menuItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { saveMenu } = useSaveMenu();
  const loading = useMenuStore((state) => state.loading);

  const [preview, setPreview] = useState(null);

  // 🔹 Cargar datos al editar
  useEffect(() => {
    if (isOpen) {
      if (menuItem) {
        reset({
          saucerName: menuItem.saucerName,
          categoryType: menuItem.categoryType,
          price: menuItem.price,
          description: menuItem.description,
        });

        setPreview(
          `https://res.cloudinary.com/dxsl6ww6y/image/upload/v1777998302/kinalSport/${menuItem.photo}`
        );
      } else {
        reset({
          saucerName: "",
          categoryType: "Desayuno",
          price: "",
          description: "",
          photo: null,
        });
        setPreview(null);
      }
    }
  }, [isOpen, menuItem, reset]);

  // 🔹 Preview imagen
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "photo" && value.photo && value.photo.length > 0) {
        setPreview(URL.createObjectURL(value.photo[0]));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // 🔹 Submit
  const onSubmit = async (data) => {
    try {
      await saveMenu(data, menuItem?._id);

      showSuccess(
        menuItem
          ? "Platillo actualizado correctamente"
          : "Platillo creado correctamente"
      );

      reset();
      setPreview(null);
      onClose();
    } catch {
      showError("Error al guardar platillo");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">
            {menuItem ? "Editar Platillo" : "Nuevo Platillo"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información del platillo
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >

          {/* PREVIEW */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-2xl bg-gray-100 border flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Sin imagen</span>
              )}
            </div>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre del platillo */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Nombre del platillo</label>
              <input
                type="text"
                {...register("saucerName", {
                  required: "El nombre es obligatorio",
                })}
                className="input"
              />
              {errors.saucerName && <p className="text-red-500 text-xs">{errors.saucerName.message}</p>}
            </div>

            {/* Categoría */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Categoría</label>
              <select
                {...register("categoryType", {
                  required: "La categoría es obligatoria",
                })}
                className="input"
              >
                <option value="Platillo-Familiar">Platillo Familiar</option>
                <option value="Desayuno">Desayuno</option>
                <option value="Almuerzo">Almuerzo</option>
                <option value="Cena">Cena</option>
              </select>
              {errors.categoryType && <p className="text-red-500 text-xs">{errors.categoryType.message}</p>}
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Precio</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "El precio es obligatorio",
                  min: { value: 0, message: "El precio no puede ser negativo" },
                })}
                className="input"
              />
              {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
            </div>

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Descripción</label>
              <textarea
                {...register("description", {
                  maxLength: { value: 500, message: "La descripción no puede exceder 500 caracteres" },
                })}
                className="input"
                rows="3"
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            {/* Imagen */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Imagen</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="input"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : menuItem ? (
                "Guardar cambios"
              ) : (
                "Crear platillo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};