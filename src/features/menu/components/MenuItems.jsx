import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMenuStore } from "../../users/store/menuStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { MenuItemsModal } from "./MenuItemsModal";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

// ✅ Helper para URL de Cloudinary
const getPhotoUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `https://res.cloudinary.com/dog2q2ise/image/upload/${photo}`;
};

export const MenuItems = () => {
  const {
    menuItems = [],
    loading,
    error,
    getMenuItems,
    deactivateMenuItem,
  } = useMenuStore();

  const { openConfirm } = useUIStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectMenuItem, setSelectMenuItem] = useState(null);

  useEffect(() => {
    getMenuItems();
  }, [getMenuItems]);

  useToastEffect(() => {
    if (error) showError(error);
  }, [error]);

  const handleDeactivate = (menuItem) => {
    const confirmOptions = {
      title: "Desactivar platillo",
      message: `¿Desactivar platillo "${menuItem.saucerName}"?`,
      onConfirm: () => deactivateMenuItem(menuItem._id),
    };
    openConfirm(confirmOptions);
    showConfirmToast(confirmOptions);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <section className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main-blue">Menú</h1>
          <p className="text-gray-500 text-sm">Gestión del catálogo de platillos</p>
        </div>

        <button
          className="bg-main-blue px-4 py-2 rounded text-white hover:opacity-90 transition"
          onClick={() => {
            setSelectMenuItem(null);
            setOpenModal(true);
          }}
        >
          + Agregar platillo
        </button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {menuItems.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500">No hay platillos disponibles.</p>
          </div>
        ) : (
          menuItems.map((menuItem) => (
            <article
              key={menuItem._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]"
            >
              {/* IMAGEN */}
              <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
                {getPhotoUrl(menuItem.photo) ? (
                  <img
                    src={getPhotoUrl(menuItem.photo)}
                    alt={`Platillo ${menuItem.saucerName}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = '<span style="font-size:2.5rem">🍽️</span>';
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "2.5rem" }}>🍽️</span>
                )}
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-main-blue">
                  {menuItem.saucerName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{menuItem.categoryType}</p>

                <div className="flex items-center justify-between gap-3 mt-4">
                  <span className="text-2xl font-semibold text-green-700">
                    ${Number(menuItem.price || 0).toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      menuItem.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {menuItem.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-2 truncate">
                  ID de diseño: {menuItem.idDiseno || menuItem._id}
                </p>

                <p className="text-sm text-gray-500 mt-4 line-clamp-3">
                  {menuItem.description || "Sin descripción"}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition"
                    onClick={() => {
                      setSelectMenuItem(menuItem);
                      setOpenModal(true);
                    }}
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                    onClick={() => handleDeactivate(menuItem)}
                  >
                    🗑️ Desactivar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      <MenuItemsModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectMenuItem(null);
        }}
        menuItem={selectMenuItem}
      />
    </section>
  );
};