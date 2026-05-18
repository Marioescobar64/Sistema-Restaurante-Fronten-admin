import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMaintenanceStore } from "../../users/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { MaintenanceModal } from "./MaintenanceModal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');`;

const statusStyle = (status) => {
  if (status === "Disponible")
    return { background: "#EAF3DE", color: "#3B6D11" };
  if (status === "Mantenimiento")
    return { background: "#FAEEDA", color: "#854F0B" };
  if (status === "Reservada")
    return { background: "#E6F1FB", color: "#185FA5" };
  return { background: "#FCEBEB", color: "#A32D2D" };
};

// ✅ Helper para construir URL correcta de Cloudinary
const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `https://res.cloudinary.com/dog2q2ise/image/upload/${photo}`;
};

export const Maintenance = () => {
  const {
    maintenances = [],
    loading,
    error,
    getMaintenanceRecords,
    deleteMaintenance,
  } = useMaintenanceStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectMaintenance, setSelectMaintenance] = useState(null);

  useEffect(() => {
    getMaintenanceRecords();
  }, [getMaintenanceRecords]);

  useToastEffect(() => {
    if (error) showError(error);
  }, [error]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-64"
        style={{ background: "transparent" }}
      >
        <Spinner className="h-10 w-10" style={{ color: "#EF4444" }} />
      </div>
    );
  }

  const total = maintenances.length;
  const available = maintenances.filter((m) => m.status === "Disponible").length;
  const inMaintenance = maintenances.filter(
    (m) => m.status === "Mantenimiento"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1rem", // Optimizado para pantallas pequeñas
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <style>{FONTS}</style>

      {/* REGLAS CSS RESPONSIVAS INYECTADAS DIRECTAMENTE */}
      <style>{`
        * { box-sizing: border-box; }
        
        .rm-card {
          background:#fff;
          border-radius:16px;
          border:0.5px solid rgba(100,60,20,0.1);
          overflow:hidden;
          transition:transform .2s, box-shadow .2s;
          width: 100%;
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

        /* Estilos Adaptables por Media Queries */
        .rm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          gap: 12px;
        }
        
        .rm-grid-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .rm-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        /* Optimización estricta para teléfonos móviles */
        @media (max-width: 600px) {
          .rm-header {
            flex-direction: column !important;
            align-items: stretch !important;
            text-align: center;
          }
          .rm-header button {
            width: 100%;
            padding: 12px !important;
          }
          .rm-grid-stats {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .rm-grid-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* HEADER */}
      <div
        className="rm-header"
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "0.5px solid rgba(239,68,68,0.2)",
          borderLeft: "4px solid #EF4444",
          padding: "20px 24px",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 600,
              color: "#7F1D1D",
              margin: 0,
            }}
          >
            Mantenimiento
          </h1>
          <p style={{ fontSize: 13, color: "#B91C1C", marginTop: 3, marginBottom: 0 }}>
            Gestión de mesas en mantenimiento
          </p>
        </div>

        <button
          onClick={() => {
            setSelectMaintenance(null);
            setOpenModal(true);
          }}
          style={{
            background: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
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
          + Nueva Mesa
        </button>
      </div>

      {/* STATS */}
      <div className="rm-grid-stats" style={{ marginBottom: "1.5rem" }}>
        <div style={cardStat("#F5EDE0")}>
          <p style={numStyle("#2C1810")}>{total}</p>
          <p style={labelStyle}>Total mesas</p>
        </div>

        <div style={cardStat("#EAF3DE")}>
          <p style={numStyle("#3B6D11")}>{available}</p>
          <p style={labelStyle}>Disponibles</p>
        </div>

        <div style={cardStat("#FAEEDA")}>
          <p style={numStyle("#854F0B")}>{inMaintenance}</p>
          <p style={labelStyle}>En mantenimiento</p>
        </div>
      </div>

      {/* TÍTULO INTERMEDIO */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "0.5px solid rgba(239,68,68,0.2)",
          borderLeft: "4px solid #EF4444",
          padding: "16px 20px",
          marginBottom: "1rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#7F1D1D",
            marginBottom: 4,
            marginTop: 0,
          }}
        >
          Tarjetas de mesa
        </h2>
        <p style={{ fontSize: 13, color: "#B91C1C", margin: 0 }}>
          Mesas: Disponibles, Ocupadas, Reservadas y en Mantenimiento
        </p>
      </div>

      {/* GRID RESPONSIVO DE TARJETAS */}
      <div className="rm-grid-cards">
        {maintenances.map((item) => (
          <div key={item._id} className="rm-card">
            {/* IMAGEN */}
            <div
              style={{
                height: 140,
                background: "#F5EDE0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {getPhotoUrl(item.photo) ? (
                <img
                  src={getPhotoUrl(item.photo)}
                  alt={`Mesa ${item.tableNumber}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 32 }}>🪑</span>
              )}
            </div>

            {/* INFO */}
            <div style={{ padding: "14px 16px 16px" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#7F1D1D",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                Mesa #{item.tableNumber}
              </h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                <span className="rm-badge" style={{ background: "#F5EDE0", color: "#6B4C35" }}>
                  {item.capacity} personas
                </span>
                <span className="rm-badge" style={{ background: "#E6F1FB", color: "#185FA5" }}>
                  {item.location}
                </span>
                <span className="rm-badge" style={statusStyle(item.status)}>
                  {item.status}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="rm-btn"
                  style={{ background: "#EAF3DE", color: "#3B6D11" }}
                  onClick={() => {
                    setSelectMaintenance(item);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="rm-btn"
                  style={{ background: "#FCEBEB", color: "#A32D2D" }}
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar mesa",
                      message: `¿Eliminar mesa #${item.tableNumber}?`,
                      onConfirm: () => deleteMaintenance(item._id),
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

      <MaintenanceModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectMaintenance(null);
        }}
        maintenance={selectMaintenance}
      />
    </div>
  );
};

// helpers
const cardStat = (bg) => ({
  background: bg,
  borderRadius: 12,
  border: "0.5px solid rgba(100,60,20,0.1)",
  padding: "16px 20px",
  textAlign: "center",
  width: "100%",
});

const numStyle = (color) => ({
  fontSize: 26,
  fontWeight: 500,
  color,
  lineHeight: 1,
  margin: 0,
});

const labelStyle = {
  fontSize: 12,
  color: "#B91C1C",
  marginTop: 4,
  marginBottom: 0,
};