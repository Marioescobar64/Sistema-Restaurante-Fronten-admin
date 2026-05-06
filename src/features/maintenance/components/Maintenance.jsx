import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMaintenanceStore } from "../../users/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { MaintenanceModal } from "./MaintenanceModal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Maintenance = () => {

  // ✅ USANDO TU STORE REAL
  const {
    maintenances = [],
    loading,
    error,
    getMaintenanceRecords,
    deleteMaintenance
  } = useMaintenanceStore();

  const { openConfirm } = useUIStore();

  // STATE
  const [openModal, setOpenModal] = useState(false);
  const [selectMaintenance, setSelectMaintenance] = useState(null);

  // LOAD DATA
  useEffect(() => {
    getMaintenanceRecords();
  }, [getMaintenanceRecords]);

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
            Mantenimiento
          </h1>
          <p className="text-gray-500 text-sm">
            Gestión de mesas en mantenimiento
          </p>
        </div>

        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition"
          onClick={() => {
            setSelectMaintenance(null);
            setOpenModal(true);
          }}
        >
          + Nueva Mesa
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {maintenances.map((maintenance) => (
          <div
            key={maintenance._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]"
          >

            {/* IMAGEN */}
            <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
              <img
                src={`https://res.cloudinary.com/dxsl6ww6y/image/upload/v1777998302/kinalSport/${maintenance.photo}`}
                alt={`Mesa ${maintenance.tableNumber}`}
                className="max-h-full max-w-full object-contain rounded-t-xl"
                onError={(e) => {
                  e.target.src = "/default-image.png";
                }}
              />
            </div>

            {/* CONTENIDO */}
            <div className="p-5">

              <h2 className="text-xl font-bold text-main-blue">
                Mesa #{maintenance.tableNumber}
              </h2>

              {/* BADGES */}
              <div className="flex gap-2 mt-2 flex-wrap">

                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                  {maintenance.capacity} personas
                </span>

                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  {maintenance.location}
                </span>

                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                  {maintenance.status}
                </span>

              </div>

              {/* INFO */}
              <p className="text-sm text-gray-400 mt-2 truncate">
                ID: {maintenance._id}
              </p>

              {/* BOTONES */}
              <div className="flex gap-3 mt-5">

                <button
                  className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                  onClick={() => {
                    setSelectMaintenance(maintenance);
                    setOpenModal(true);
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                  onClick={() =>
                    showConfirmToast({
                      title: "Eliminar mesa",
                      message: `¿Eliminar mesa #${maintenance.tableNumber}?`,
                      onConfirm: () => deleteMaintenance(maintenance._id),
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

      {/* MODAL */}
      <MaintenanceModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectMaintenance(null);
        }}
        field={selectMaintenance} // 👈 lo dejamos así como tu sistema
      />
    </div>
  );
};