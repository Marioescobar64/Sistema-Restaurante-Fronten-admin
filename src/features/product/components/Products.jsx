import { useEffect } from "react";
import { useEffect as useToastEffect } from "react";
import { useState } from "react";

import { useProductStore } from "../../users/store/productStore"; // Tu Store real de productos
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { ProductModal } from "./ProductsModal"; // Tu nuevo modal de productos
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Products = () => {

  // ✅ USANDO TU STORE REAL DE PRODUCTOS
  const {
    products = [],
    loading,
    error,
    getProducts,
    deleteProduct
  } = useProductStore();

  const { openConfirm } = useUIStore();

  // STATE
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // LOAD DATA
  useEffect(() => {
    getProducts();
  }, [getProducts]);

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

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">
            Gestión del Menú
          </h1>
          <p className="text-gray-500 text-sm">
            Administra los platillos, bebidas, categorías y precios de tu restaurante
          </p>
        </div>

        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition font-semibold shadow-md"
          onClick={() => {
            setSelectedProduct(null);
            setOpenModal(true);
          }}
        >
          + Nuevo Producto
        </button>
      </div>

      {/* GRID */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay productos registrados en el menú.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] flex flex-col justify-between"
            >
              {/* CONTENIDO */}
              <div className="p-5 flex-1">
                
                {/* CATEGORÍA Y ESTADO */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="px-3 py-1 text-xs rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    📂 {product.categoria || "General"}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                    product.isActive !== false 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.isActive !== false ? "Activo" : "Inactivo"}
                  </span>
                </div>

                {/* NOMBRE DEL PRODUCTO */}
                <h2 className="text-xl font-bold text-main-blue mb-1 line-clamp-1">
                  {product.nombre}
                </h2>

                {/* DESCRIPCIÓN */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                  {product.descripcion || "Sin descripción"}
                </p>

                {/* BADGE DE PRECIO */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">
                    💰 Precio: Q{Number(product.precio).toFixed(2)}
                  </span>
                </div>

                {/* INFO ADICIONAL */}
                <p className="text-xs text-gray-400 mt-4 truncate">
                  ID: {product._id}
                </p>
              </div>

              {/* BOTONES */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex gap-3 bg-gray-50/50">
                <button
                  className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition text-sm shadow-sm"
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm shadow-sm"
                  onClick={() =>
                    showConfirmToast({
                      title: "Desactivar producto",
                      message: `¿Estás seguro de desactivar el producto "${product.nombre}"?`,
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