import { useEffect } from "react";
import { useEffect as useToastEffect } from "react";
import { useState } from "react";

import { useOrderStore } from "../../users/store/orderStore"; // Tu Store real de pedidos
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { OrderModal } from "./OrderModal"; // Tu nuevo modal de pedidos en español
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Orders = () => {

  // ✅ USANDO TU STORE REAL DE PEDIDOS
  const {
    orders = [],
    loading,
    error,
    getOrders,
    deleteOrder
  } = useOrderStore();

  const { openConfirm } = useUIStore();

  // STATE
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // LOAD DATA
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // TOAST ERROR
  useToastEffect(() => {
    if (error) showError(error);
  }, [error]);

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  // Helper para asignar colores dinámicos a los badges según el estado del pedido en tu base de datos
  const getEstadoBadgeColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "En proceso":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "Entregado":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Cancelado":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  // Helper para formatear la fecha de MongoDB de forma legible (DD/MM/YYYY)
  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-GT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">
            Gestión de Pedidos
          </h1>
          <p className="text-gray-500 text-sm">
            Administración, control de estados y facturación de órdenes
          </p>
        </div>

        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition font-semibold shadow-md"
          onClick={() => {
            setSelectedOrder(null);
            setOpenModal(true);
          }}
        >
          + Nuevo Pedido
        </button>
      </div>

      {/* GRID */}
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay pedidos registrados en el sistema.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] flex flex-col justify-between"
            >
              {/* CONTENIDO */}
              <div className="p-5 flex-1">
                
                {/* ESTADO & FECHA */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getEstadoBadgeColor(order.estado)}`}>
                    {order.estado}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {formatearFecha(order.fechaPedido)}
                  </span>
                </div>

                {/* NOMBRE DEL PEDIDO */}
                <h2 className="text-xl font-bold text-main-blue mb-1 line-clamp-1">
                  {order.nombrePedido}
                </h2>

                {/* DESCRIPCIÓN */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                  {order.descripcion || "Sin descripción adicional"}
                </p>

                {/* BADGES / INFO */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">
                    💰 Total: Q{Number(order.total).toFixed(2)}
                  </span>
                </div>

                {/* INFO ADICIONAL */}
                <p className="text-xs text-gray-400 mt-4 truncate">
                  ID: {order._id}
                </p>
              </div>

              {/* BOTONES */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex gap-3 bg-gray-50/50">
                <button
                  className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition text-sm shadow-sm"
                  onClick={() => {
                    setSelectedOrder(order);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm shadow-sm"
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar pedido",
                      message: `¿Estás seguro de eliminar el pedido "${order.nombrePedido}"?`,
                      onConfirm: () => deleteOrder(order._id),
                    })
                  }
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <OrderModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
};