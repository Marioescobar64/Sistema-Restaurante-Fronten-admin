import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../../users/store/orderStore.js";
import { Spinner } from "@material-tailwind/react";
import { useSaveOrder } from "../../administration/hooks/useSaveOrder.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const ProductModal = ({ isOpen, onClose, order }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveOrder } = useSaveOrder();
  const loading = useOrderStore((state) => state.loading);

  // Cargar datos al editar
  useEffect(() => {
    if (isOpen) {
      if (product) {
        reset({
          nombrePedido: product.nombrePedido || product.nombre, // Adaptado por si se llama nombre
          cantidad: product.cantidad,
          cantidadObtenida: product.cantidadObtenida,
          precio: product.precio || product.total, // Adaptado por si usabas total
          fechaExp: product.fechaExp
            ? new Date(product.fechaExp).toISOString().split("T")[0]
            : "",
        });
      } else {
        reset({
          nombrePedido: "",
          cantidad: "",
          cantidadObtenida: "",
          precio: "",
          fechaExp: "",
        });
      }
    }
  }, [isOpen, order, reset]);

  const onSubmit = async (data) => {
    try {
      await saveOrder(data, order?._id);
      showSuccess(order ? "Actualizado correctamente" : "Creado correctamente");
      reset();
      onClose();
    } catch (error) {
      showError(error.message || "Error al guardar");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden font-['DM_Sans']">

        {/* HEADER MODAL */}
        <div className="p-6 border-b border-gray-100 bg-[#FAF9F6]">
          <h2 className="text-xl font-semibold text-gray-800">
            {order ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Modifica las cantidades y fechas para actualizar el estado visual en la tabla.
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
              <input
                type="text"
                {...register("nombrePedido", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Cantidad Mínima Requerida</label>
              <input
                type="number"
                {...register("cantidad", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Cantidad Obtenida (Stock)</label>
              <input
                type="number"
                {...register("cantidadObtenida", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Fecha de Expiración</label>
              <input
                type="date"
                {...register("fechaExp", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Precio (Q)</label>
              <input
                type="number"
                step="0.01"
                {...register("precio", { required: "Obligatorio" })}
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-6 justify-end">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#111827] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium min-w-[120px] flex justify-center items-center"
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};