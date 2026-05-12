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
        padding: "1.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
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
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 600,
              color: "#7F1D1D",
            }}
          >
            Mantenimiento
          </h1>
          <p style={{ fontSize: 13, color: "#B91C1C", marginTop: 3 }}>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: "1.5rem",
        }}
      >
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

      <p
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: ".08em",
          color: "#B91C1C",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        Tarjetas de mesa
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {maintenances.map((item) => (
          <div key={item._id} className="rm-card">
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
              <img
                src={`https://res.cloudinary.com/dxsl6ww6y/image/upload/v1777998302/kinalSport/${item.photo}`}
                alt={`Mesa ${item.tableNumber}`}
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
            </div>

            <div style={{ padding: "14px 16px 16px" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#7F1D1D",
                  marginBottom: 8,
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
});

const numStyle = (color) => ({
  fontSize: 26,
  fontWeight: 500,
  color,
  lineHeight: 1,
});

const labelStyle = {
  fontSize: 12,
  color: "#B91C1C",
  marginTop: 4,
};