import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useProductStore } from "../../users/store/productStore"; 
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { ProductModal } from "./ProductsModal"; 
import { showConfirmToast } from "../../auth/components/ConfirmModal";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');`;

const statusStyle = (isActive) => {
  if (isActive !== false) return { background: "#FEE2E2", color: "#B91C1C" }; // activo
  return { background: "#FECACA", color: "#A32D2D" }; // inactivo
};

export const Products = () => {
  const { products = [], loading, error, getProducts, deleteProduct } = useProductStore();
  const { openConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => { getProducts(); }, [getProducts]);

  useToastEffect(() => { if (error) showError(error); }, [error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10" style={{ color: "#EF4444" }} />
      </div>
    );
  }

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
            Gestión del Menú
          </h1>
          <p style={{ fontSize: 13, color: "#991B1B", marginTop: 3 }}>
            Administra los platillos, bebidas, categorías y precios de tu restaurante
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProduct(null);
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
          + Nuevo Producto
        </button>
      </div>

      {/* GRID */}
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: 16, border: "1px dashed #FCA5A5" }}>
          <p style={{ color: "#991B1B" }}>No hay productos registrados en el menú.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {products.map((product) => (
            <div key={product._id} className="rm-card">
              <div style={{ padding: "14px 16px 16px" }}>
                {/* CATEGORÍA Y ESTADO */}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 5, marginBottom: 8, flexWrap: "wrap" }}>
                  <span className="rm-badge" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                    📂 {product.categoria || "General"}
                  </span>
                  <span className="rm-badge" style={statusStyle(product.isActive)}>
                    {product.isActive !== false ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* NOMBRE */}
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: "#B91C1C", marginBottom: 8 }}>
                  {product.nombre}
                </h2>

                {/* DESCRIPCIÓN */}
                <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 8, minHeight: "40px" }}>
                  {product.descripcion || "Sin descripción"}
                </p>

                {/* PRECIO */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  <span className="rm-badge" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                    💰 Precio: Q{Number(product.precio).toFixed(2)}
                  </span>
                </div>

                {/* ID */}
                <p style={{ fontSize: 10, color: "#6B7280", marginTop: 6, overflow: "hidden", textOverflow: "ellipsis" }}>
                  ID: {product._id}
                </p>
              </div>

              {/* BOTONES */}
              <div style={{ display: "flex", gap: 8, padding: "10px 16px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <button
                  className="rm-btn"
                  style={{ background: "#FEE2E2", color: "#B91C1C" }}
                  onClick={() => {
                    setSelectedProduct(product);
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
                      title: "Eliminar producto",
                      message: `¿Estás seguro de eliminar el producto "${product.nombre}"?`,
                      onConfirm: () => deleteProduct(product._id),
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
      <ProductModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
};