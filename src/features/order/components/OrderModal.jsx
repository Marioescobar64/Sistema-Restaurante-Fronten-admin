import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../../users/store/orderStore";
import { Spinner } from "@material-tailwind/react";
import { useSaveOrder } from "../../administration/hooks/useSaveOrder.js";
import { showSuccess, showError } from "../../../shared/utils/toast.js";

export const OrderModal = ({ isOpen, onClose, order }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveOrder } = useSaveOrder();
  const loading = useOrderStore((state) => state.loading);

  // 🔹 Cargar datos al editar
  useEffect(() => {
    if (isOpen) {
      if (order) {
        reset({
          nombrePedido: order.nombrePedido,
          descripcion: order.descripcion,
          total: order.total,
          estado: order.estado,
          fechaPedido: order.fechaPedido
            ? new Date(order.fechaPedido).toISOString().split("T")[0]
            : "",
        });
      } else {
        reset({
          nombrePedido: "",
          descripcion: "",
          total: "",
          estado: "Pendiente",
          fechaPedido: new Date().toISOString().split("T")[0],
        });
      }
    }
  }, [isOpen, order, reset]);

  // 🔹 Submit
  const onSubmit = async (data) => {
    try {
      await saveOrder(data, order?._id);

      showSuccess(
        order
          ? "Pedido actualizado correctamente"
          : "Pedido creado correctamente"
      );

      reset();
      onClose();
    } catch (error) {
      showError(error.message || "Error al guardar el pedido");
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
            background: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {order ? "Editar Pedido" : "Nuevo Pedido"}
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Completa la información del pedido
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre del Pedido */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Nombre del Pedido</label>
              <input
                type="text"
                placeholder="Ej. Almuerzo Ejecutivo, Cena Especial..."
                {...register("nombrePedido", {
                  required: "El nombre es obligatorio",
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
                className="input rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.nombrePedido && (
                <p className="text-red-500 text-xs mt-1">{errors.nombrePedido.message}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Descripción</label>
              <textarea
                placeholder="Detalles adicionales del pedido..."
                {...register("descripcion", { required: "La descripción es obligatoria" })}
                className="input min-h-[80px] rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
              )}
            </div>

            {/* Total */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Total (Q)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("total", {
                  required: "El total es obligatorio",
                  min: { value: 0, message: "El total no puede ser negativo" },
                })}
                className="input rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.total && (
                <p className="text-red-500 text-xs mt-1">{errors.total.message}</p>
              )}
            </div>

            {/* Fecha del Pedido */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Fecha del Pedido</label>
              <input
                type="date"
                {...register("fechaPedido", { required: "La fecha es obligatoria" })}
                className="input rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.fechaPedido && (
                <p className="text-red-500 text-xs mt-1">{errors.fechaPedido.message}</p>
              )}
            </div>

            {/* Estado */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-semibold">Estado del Pedido</label>
              <select
                {...register("estado", { required: "El estado es obligatorio" })}
                className="input rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En proceso">En proceso</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              {errors.estado && (
                <p className="text-red-500 text-xs mt-1">{errors.estado.message}</p>
              )}
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex gap-3 pt-4 border-t justify-end">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded transition-colors flex items-center justify-center min-w-[120px]"
            >
              {loading ? <Spinner className="h-4 w-4" /> : order ? "Guardar cambios" : "Crear pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};