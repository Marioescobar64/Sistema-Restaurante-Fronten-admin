import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../users/store/productStore.js";
import { Spinner } from "@material-tailwind/react";
import { useSaveProduct } from "../../administration/hooks/useSaveProduct.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ProductModal = ({ isOpen, onClose, product }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveProduct } = useSaveProduct();
  const loading = useProductStore((state) => state.loading);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          nombre:           product.nombre,
          cantidad:         product.cantidad,
          cantidadObtenida: product.cantidadObtenida,
          precio:           product.precio,
          fechaExp:         product.fechaExp
            ? new Date(product.fechaExp).toISOString().split("T")[0]
            : "",
          descripcion:      product.descripcion || "",
          categoria:        product.categoria || "",
        });
      } else {
        reset({
          nombre:           "",
          cantidad:         "",
          cantidadObtenida: "",
          precio:           "",
          fechaExp:         "",
          descripcion:      "",
          categoria:        "",
        });
      }
    }
  }, [isOpen, product, reset]);

  const onSubmit = async (data) => {
    try {
      await saveProduct(data, product?._id);
      showSuccess(product ? "Actualizado correctamente" : "Creado correctamente");
      reset();
      onClose();
    } catch (error) {
      showError(error.message || "Error al guardar");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4 box-border overflow-x-hidden">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden font-['DM_Sans'] box-border my-auto">

        {/* HEADER */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-[#FAF9F6] flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 m-0">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
            Modifica las cantidades y fechas para actualizar el estado visual en la tabla.
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto box-border flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            {/* Nombre */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
              <input
                type="text"
                {...register("nombre", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 box-border appearance-none w-full"
              />
              {errors.nombre && <span className="text-xs text-red-500 mt-1">{errors.nombre.message}</span>}
            </div>

            {/* Cantidad */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Cantidad Mínima Requerida</label>
              <input
                type="number"
                {...register("cantidad", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 box-border appearance-none w-full"
              />
              {errors.cantidad && <span className="text-xs text-red-500 mt-1">{errors.cantidad.message}</span>}
            </div>

            {/* Cantidad Obtenida */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Cantidad Obtenida (Stock)</label>
              <input
                type="number"
                {...register("cantidadObtenida", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 box-border appearance-none w-full"
              />
              {errors.cantidadObtenida && <span className="text-xs text-red-500 mt-1">{errors.cantidadObtenida.message}</span>}
            </div>

            {/* Fecha */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Fecha de Expiración</label>
              <input
                type="date"
                {...register("fechaExp", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 box-border appearance-none w-full"
              />
              {errors.fechaExp && <span className="text-xs text-red-500 mt-1">{errors.fechaExp.message}</span>}
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Precio (Q)</label>
              <input
                type="number"
                step="0.01"
                {...register("precio", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 box-border appearance-none w-full"
              />
              {errors.precio && <span className="text-xs text-red-500 mt-1">{errors.precio.message}</span>}
            </div>

            {/* Categoría */}
            <div className="flex flex-col">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <input
                type="text"
                {...register("categoria", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 box-border appearance-none w-full"
              />
              {errors.categoria && <span className="text-xs text-red-500 mt-1">{errors.categoria.message}</span>}
            </div>

            {/* Descripción */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                rows={3}
                {...register("descripcion", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 box-border w-full resize-none"
              />
              {errors.descripcion && <span className="text-xs text-red-500 mt-1">{errors.descripcion.message}</span>}
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 justify-end w-full box-border">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm w-full sm:w-auto text-center cursor-pointer box-border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#111827] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm w-full sm:w-auto min-w-[120px] flex justify-center items-center cursor-pointer box-border"
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};