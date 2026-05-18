import { useEffect } from "react";
import { useEffect as useToastEffect } from "react";
import { useState } from "react";

import { useTableStore } from "../../users/store/mesaStore"; 
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { TableModal } from "./TableModal"; 
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
      <div className="flex justify-center items-center h-64 min-h-[50vh]">
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
    <div className="p-3 sm:p-5 w-full box-border">

      {/* HEADER RESPONSIVO */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 text-center sm:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-main-blue m-0">
            Gestión de Mesas
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 mb-0">
            Administración y disponibilidad de las mesas del restaurante
          </p>
        </div>

        <button
          className="bg-main-blue w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-lg text-white hover:opacity-90 transition font-semibold shadow-md text-sm"
          onClick={() => {
            setSelectedTable(null);
            setOpenModal(true);
          }}
        >
          + Nueva Mesa
        </button>
      </div>

      {/* GRID CONFIGURADO PARA COLAPSAR EN MÓVILES */}
      {tables.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 px-4">
          <p className="text-gray-500 text-sm m-0">No hay mesas registradas en el sistema.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {tables.map((table) => (
            <div
              key={table._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.01] flex flex-col justify-between"
            >
              {/* CONTENIDO DE LA TARJETA */}
              <div className="p-5 flex-1">
                
                {/* ID & ESTADO */}
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold whitespace-nowrap ${getEstadoBadgeColor(table.estado)}`}>
                    {table.estado}
                  </span>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                    Mesa #{table.numeroMesa}
                  </span>
                </div>

                {/* DESCRIPCIÓN */}
                <h2 className="text-lg sm:text-xl font-bold text-main-blue mb-2 line-clamp-2 m-0">
                  {table.descripcion || "Mesa sin descripción"}
                </h2>

                {/* BADGES */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="px-2.5 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium whitespace-nowrap">
                    👥 Capacidad: {table.capacidad} {table.capacidad === 1 ? "persona" : "personas"}
                  </span>
                </div>

                {/* INFO ADICIONAL */}
                <p className="text-[11px] text-gray-400 mt-5 mb-0 truncate">
                  ID: {table._id}
                </p>
              </div>

              {/* BOTONES ACCIONABLES */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex gap-3 bg-gray-50/50">
                <button
                  className="flex-1 py-2.5 sm:py-2 rounded-xl bg-main-blue text-white font-medium hover:opacity-90 transition text-sm shadow-sm flex items-center justify-center gap-1"
                  onClick={() => {
                    setSelectedTable(table);
                    setOpenModal(true);
                  }}
                >
                  ✏️ <span className="inline">Editar</span>
                </button>

                <button
                  className="flex-1 py-2.5 sm:py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm shadow-sm flex items-center justify-center gap-1"
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar mesa",
                      message: `¿Estás seguro de eliminar la mesa #${table.numeroMesa}?`,
                      onConfirm: () => deleteTable(table._id),
                    })
                  }
                >
                  🗑️ <span className="inline">Eliminar</span>
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