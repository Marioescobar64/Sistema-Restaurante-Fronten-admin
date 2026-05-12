import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useOrderStore } from "../../users/store/orderStore"; 
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { OrderModal } from "./OrderModal"; 
import { showConfirmToast } from "../../auth/components/ConfirmModal";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');`;

const statusStyle = (status) => {
  if (status === "Pendiente") return { background: "#FEE2E2", color: "#991B1B" }; // rojo suave
  if (status === "En proceso") return { background: "#FEEBC8", color: "#7C2D12" };
  if (status === "Entregado") return { background: "#FEE2E2", color: "#B91C1C" };
  if (status === "Cancelado") return { background: "#FECACA", color: "#A32D2D" };
  return { background: "#F3F4F6", color: "#374151" };
};

export const Orders = () => {
  const { orders = [], loading, error, getOrders, deleteOrder } = useOrderStore();
  const { openConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Cargar pedidos
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // Mostrar errores con toast
  useToastEffect(() => {
    if (error) showError(error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", padding: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{FONTS}</style>
      <style>{`
        .rm-card {
          background:#fff;
          border-radius:16px;
          border:0.5px solid rgba(100,60,20,0.1);
          overflow:hidden;
          transition:transform .2s, box-shadow .2s;
        }
        .rm-card:hover {
          transform:translateY(-3px);
          box-shadow:0 10px 28px rgba(100,60,20,0.1);
        }
        .rm-badge {
          display:inline-flex;
          align-items:center;
          padding:3px 10px;
          border-radius:20px;
          font-size:11px;
          font-weight:500;
        }
        .rm-btn {
          flex:1;
          padding:9px 0;
          border-radius:9px;
          font-size:13px;
          font-weight:500;
          cursor:pointer;
          border:none;
          font-family:'DM Sans',sans-serif;
          transition:opacity .15s;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:5px;
        }
        .rm-btn:hover { opacity:.85; }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "0.5px solid rgba(239,68,68,0.2)",
          borderLeft: "4px solid #EF4444",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#B91C1C" }}>
            Gestión de Pedidos
          </h1>
          <p style={{ fontSize: 13, color: "#991B1B", marginTop: 3 }}>
            Administración, control de estados y facturación de órdenes
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedOrder(null);
            setOpenModal(true);
          }}
          style={{
            background: "linear-gradient(135deg, #EF4444 0%, #991B1B 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "9px 18px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          + Nuevo Pedido
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <Spinner className="h-10 w-10" style={{ color: "#EF4444" }} />
        </div>
      )}

      {/* GRID DE PEDIDOS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {orders.map((order) => (
          <div key={order._id} className="rm-card">
            <div style={{ padding: "14px 16px 16px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: "#B91C1C", marginBottom: 8 }}>
                {order.nombrePedido}
              </h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                <span className="rm-badge" style={statusStyle(order.estado)}>
                  {order.estado}
                </span>
                <span className="rm-badge" style={{ background: "#FEE2E2", color: "#991B1B" }}>
                  Q{Number(order.total || 0).toFixed(2)}
                </span>
                <span className="rm-badge" style={{ background: "#FEE2E2", color: "#991B1B" }}>
                  {formatearFecha(order.fechaPedido)}
                </span>
              </div>

              <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 8, minHeight: "40px" }}>
                {order.descripcion || "Sin descripción adicional"}
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="rm-btn"
                  style={{ background: "#FEE2E2", color: "#991B1B" }}
                  onClick={() => {
                    setSelectedOrder(order);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="rm-btn"
                  style={{ background: "#FECACA", color: "#A32D2D" }}
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar pedido",
                      message: `¿Eliminar pedido "${order.nombrePedido}"?`,
                      onConfirm: () => deleteOrder(order._id),
                    })
                  }
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

// helper
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  const date = new Date(fecha);
  return date.toLocaleDateString("es-GT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};