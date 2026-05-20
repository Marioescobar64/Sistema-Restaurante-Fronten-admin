import { useEffect, useState } from "react";
import { useAdminUserStore } from "../../users/store/adminUserStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { Spinner } from "@material-tailwind/react";
import { showConfirmToast } from "../../auth/components/ConfirmModal";

export const Administration = () => {
  const { adminUsers, loading, error, getAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } = useAdminUserStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cargo: "",
    rol: "",
  });

  useEffect(() => {
    getAdminUsers();
  }, [getAdminUsers]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        cargo: user.cargo || "",
        rol: user.rol || "",
      });
    } else {
      setSelectedUser(null);
      setFormData({ nombre: "", apellido: "", cargo: "", rol: "" });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setFormData({ nombre: "", apellido: "", cargo: "", rol: "" });
  };

  const handleSaveUser = async () => {
    const { nombre, apellido, cargo, rol } = formData;
    if (!nombre.trim() || !apellido.trim() || !cargo.trim() || !rol.trim()) {
      showError("Completa todos los campos del usuario");
      return;
    }

    try {
      const payload = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        cargo: cargo.trim(),
        rol: rol.trim(),
      };

      if (selectedUser) {
        await updateAdminUser(selectedUser._id, payload);
        showSuccess("Usuario administrativo actualizado correctamente");
      } else {
        await createAdminUser(payload);
        showSuccess("Usuario administrativo creado correctamente");
      }

      handleCloseModal();
    } catch (saveError) {
      showError("Error al guardar el usuario administrativo");
    }
  };

  const handleDeleteUser = (user) => {
    showConfirmToast({
      title: "Eliminar usuario administrativo",
      message: `¿Eliminar a ${user.nombre} ${user.apellido}?`,
      onConfirm: async () => {
        await deleteAdminUser(user._id);
        showSuccess("Usuario eliminado correctamente");
      },
    });
  };

  return (
    <section className="space-y-6 p-4 max-w-7xl mx-auto box-border w-full overflow-x-hidden">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C1506]">Administración</h1>
          <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1">
            Gestión de usuarios administrativos con datos de nombre, apellido, cargo y rol.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="w-full md:w-auto py-2 px-4 rounded-xl bg-[#C00000] text-white text-sm font-semibold hover:bg-[#A00000] transition"
        >
          + Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 min-h-[40vh]">
          <Spinner className="h-10 w-10 text-blue-500" />
        </div>
      ) : adminUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-sm">No hay usuarios administrativos registrados.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#C00000]/15 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_1fr] gap-0 text-left bg-[#FFF8F0]/90 px-4 py-3 text-xs sm:text-sm font-semibold text-[#2C1506] border-b border-[#C00000]/10">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Cargo</span>
            <span>Rol</span>
          </div>
          <div className="divide-y divide-[#C00000]/10">
            {adminUsers.map((user) => (
              <div key={user._id} className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr_1fr] gap-0 px-4 py-4 items-center text-sm text-[#2C1506]">
                <div className="font-semibold">{user.nombre}</div>
                <div>{user.apellido}</div>
                <div>{user.cargo}</div>
                <div className="flex items-center justify-between gap-3">
                  <span>{user.rol}</span>
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="px-3 py-2 rounded-lg bg-[#C00000]/10 text-[#C00000] hover:bg-[#C00000]/15 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#2C1506]">
                  {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
                </h2>
                <p className="text-sm text-[#2C1506]/75 mt-1">
                  Completa los datos para el usuario administrativo.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#2C1506]/70 hover:text-[#2C1506]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C1506] mb-2">Nombre</label>
                <input
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm"
                  placeholder="Ej. María"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C1506] mb-2">Apellido</label>
                <input
                  value={formData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm"
                  placeholder="Ej. López"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C1506] mb-2">Cargo</label>
                <input
                  value={formData.cargo}
                  onChange={(e) => handleInputChange("cargo", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm"
                  placeholder="Ej. Gerente"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C1506] mb-2">Rol</label>
                <input
                  value={formData.rol}
                  onChange={(e) => handleInputChange("rol", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm"
                  placeholder="Ej. Administrador"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#C00000] text-white hover:bg-[#A00000] transition"
              >
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
