import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

// 1. Usamos tu Product Store en lugar de Order Store
import { useProductStore } from "../../users/store/productStore"; 
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { ProductModal } from "./ProductModal"; 
import { showConfirmToast } from "../../auth/components/ConfirmModal";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`;

// --- LÓGICA DE COLORES ---
const getQuantityStyle = (cantidad) => {
  const qty = Number(cantidad);
  if (qty >= 500) return { bg: "#ECFDF5", text: "#065F46" }; // Verde
  if (qty >= 200) return { bg: "#FEF3C7", text: "#92400E" }; // Amarillo
  return { bg: "#FEF2F2", text: "#991B1B" };                 // Rojo
};

const getExpirationStyle = (fechaExp) => {
  if (!fechaExp) return { bg: "#F3F4F6", text: "#374151" };
  
  const hoy = new Date();
  const exp = new Date(fechaExp);
  const diffTime = exp - hoy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 30) return { bg: "#ECFDF5", text: "#065F46" }; 
  if (diffDays >= 0) return { bg: "#FEF3C7", text: "#92400E" }; 
  return { bg: "#FEF2F2", text: "#991B1B" };                    
};

// 2. El componente se llama "Products"
export const Products = () => {
  // 3. Extraemos las funciones de tu useProductStore
  const { products = [], loading, error, getProducts, deleteProduct } = useProductStore();
  const { openConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 4. Llamamos a getProducts al cargar la página
  useEffect(() => { getProducts(); }, [getProducts]);
  useToastEffect(() => { if (error) showError(error); }, [error]);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", backgroundColor: "#FAFAFA" }} className="p-4 sm:p-8 w-full box-border">
      <style>{FONTS}</style>
      
      {/* LEYENDA (Legend) RESPONSIVA */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 items-center text-xs sm:text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-3 h-3 rounded-full bg-[#65A30D]"></span> Cantidad óptima
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span> Rango de alerta
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Crítico / Vencido
        </div>
      </div>

      {/* HEADER & BOTÓN NUEVO ADAPTADOS */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 m-0">Inventario</h1>
        <button
          onClick={() => { setSelectedProduct(null); setOpenModal(true); }}
          className="bg-[#111827] text-white w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-sm text-center"
        >
          + Agregar Producto
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <Spinner className="h-8 w-8 text-gray-800" />
        </div>
      )}

      {/* TABLA ESTILO EXCEL CON CONTENEDOR DE SCROLL HORIZONTAL MÓVIL */}
      {!loading && (
        <div className="bg-[#FAF9F6] border border-gray-200 rounded-xl overflow-x-auto shadow-sm w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs sm:text-sm text-gray-600">
                <th className="py-4 px-6 font-medium">Producto</th>
                <th className="py-4 px-6 font-medium">Cantidad</th>
                <th className="py-4 px-6 font-medium">Cant. Obtenida</th>
                <th className="py-4 px-6 font-medium">Fecha Exp.</th>
                <th className="py-4 px-6 font-medium">Precio</th>
                <th className="py-4 px-6 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                const qtyStyle = getQuantityStyle(prod.cantidad);
                const expStyle = getExpirationStyle(prod.fechaExp);

                return (
                  <tr key={prod._id} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {prod.nombre}
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-md font-semibold text-sm inline-block" style={{ backgroundColor: qtyStyle.bg, color: qtyStyle.text }}>
                        {prod.cantidad || 0}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-semibold text-gray-800">
                      {prod.cantidadObtenida || 0}
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-md font-semibold text-sm inline-block" style={{ backgroundColor: expStyle.bg, color: expStyle.text }}>
                        {formatearFecha(prod.fechaExp)}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-600 font-medium">
                      Q{Number(prod.precio || 0).toFixed(2)}
                    </td>

                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => { setSelectedProduct(prod); setOpenModal(true); }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        Editar
                      </button>
                      <button
                        onClick={() => showConfirmToast({
                          title: "Eliminar producto",
                          message: `¿Eliminar "${prod.nombre}"?`,
                          onConfirm: () => deleteProduct(prod._id), 
                        })}
                        className="inline-flex items-center justify-center p-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Pasamos product en vez de order */}
      <ProductModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setSelectedProduct(null); }}
        product={selectedProduct} 
      />
    </div>
  );
};

// helper
const formatearFecha = (fecha) => {
  if (!fecha) return "N/A";
  const date = new Date(fecha);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toLocaleDateString("es-GT", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
};