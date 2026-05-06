import { useEffect } from "react";
import { useEffect as useToastEffect } from "react";
import { useState } from "react";

import { useTableStore } from "../../users/store/mesaStore"; // Tu Store real de mesas
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { TableModal } from "./TableModal"; // Tu nuevo modal sin fotos y en español
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Tables = () => {

  // ✅ USANDO TU STORE REAL DE MESAS
  const {
    tables = [],
    loading,
    error,
    getTables,
    deleteTable
  } = useTableStore();

  const { openConfirm } = useUIStore();

  // STATE
  const [openModal, setOpenModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  // LOAD DATA
  useEffect(() => {
    getTables();
  }, [getTables]);

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

  // Helper para asignar colores dinámicos a los badges según el estado del backend
  const getEstadoBadgeColor = (estado) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Ocupada":
        return "bg-red-100 text-red-700 border border-red-200";
      case "Reservada":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">
            Gestión de Mesas
          </h1>
          <p className="text-gray-500 text-sm">
            Administración y disponibilidad de las mesas del restaurante
          </p>
        </div>

        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition font-semibold shadow-md"
          onClick={() => {
            setSelectedTable(null);
            setOpenModal(true);
          }}
        >
          + Nueva Mesa
        </button>
      </div>

      {/* GRID */}
      {tables.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay mesas registradas en el sistema.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] flex flex-col justify-between"
            >
              {/* CONTENIDO */}
              <div className="p-5 flex-1">
                
                {/* ID & ESTADO */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getEstadoBadgeColor(table.estado)}`}>
                    {table.estado}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    Mesa #{table.numeroMesa}
                  </span>
                </div>

                {/* DESCRIPCIÓN */}
                <h2 className="text-xl font-bold text-main-blue mb-2 line-clamp-1">
                  {table.descripcion || "Mesa sin descripción"}
                </h2>

                {/* BADGES */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                    👥 Capacidad: {table.capacidad} {table.capacidad === 1 ? "persona" : "personas"}
                  </span>
                </div>

                {/* INFO ADICIONAL */}
                <p className="text-xs text-gray-400 mt-4 truncate">
                  ID: {table._id}
                </p>
              </div>

              {/* BOTONES */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex gap-3 bg-gray-50/50">
                <button
                  className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition text-sm shadow-sm"
                  onClick={() => {
                    setSelectedTable(table);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm shadow-sm"
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar mesa",
                      message: `¿Estás seguro de eliminar la mesa #${table.numeroMesa}?`,
                      onConfirm: () => deleteTable(table._id),
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
      <TableModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTable(null);
        }}
        table={selectedTable}
      />
    </div>
  );
};