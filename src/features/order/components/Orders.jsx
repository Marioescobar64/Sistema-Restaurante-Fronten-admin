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
  if (status === "Entregado") return { background: "#D1FAE5", color: "#065F46" }; // Optimización de legibilidad (Verde)
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
    <div className="rm-orders-container" style={{ minHeight: "100vh", padding: "1.5rem", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}>
      <style>{FONTS}</style>
      <style>{`
        .rm-card {
          background:#fff;
          border-radius:16px;
          border:0.5px solid rgba(100,60,20,0.1);
          overflow:hidden;
          transition:transform .2s, box-shadow .2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          white-space: nowrap;
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

        /* REGLAS RESPONSIVAS AGREGADAS */
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        @media (max-width: 640px) {
          .rm-orders-container {
            padding: 1rem !important;
          }
          .rm-header-block {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: center;
            padding: 16px !important;
          }
          .rm-header-block button {
            width: 100% !important;
            padding: 12px !important;
            display: block;
          }
          .orders-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .rm-badge-group {
            gap: 6px !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <div
        className="rm-header-block"
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
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#B91C1C", margin: 0 }}>
            Gestión de Pedidos
          </h1>
          <p style={{ fontSize: 13, color: "#991B1B", marginTop: 5, marginBottom: 0 }}>
            Análisis, control de estados y facturación de órdenes
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
        <div style={{ display: "flex", justifycontent: "center", alignItems: "center", height: "50vh" }}>
          <Spinner className="h-10 w-10" style={{ color: "#EF4444" }} />
        </div>
      )}

      {/* GRID DE PEDIDOS */}
      <div className="orders-grid">
        {orders.length === 0 && !loading ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem", color: "#6B7280", background: "#fff", borderRadius: 12 }}>
            No hay pedidos registrados en este momento.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="rm-card">
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "between" }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 500, color: "#B91C1C", marginBottom: 10, marginTop: 0 }}>
                    {order.nombrePedido}
                  </h2>

                  <div className="rm-badge-group" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
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

                  <p style={{ fontSize: 12, color: "#555860", marginBottom: 16, minHeight: "38px", lineHeight: "1.4" }}>
                    {order.descripcion || "Sin descripción adicional"}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
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
          ))
        )}
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