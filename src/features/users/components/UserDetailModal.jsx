export const UserDetailModal = ({ isOpen, user, onClose }) => {
    if (!isOpen || !user) return null;

    const avatarSrc =
        user.profilePicture || "/src/assets/img/logo.png";

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-[#F5F5DC] rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-[#7F3C09]/20">

                {/* HEADER */}
                <div className="p-5 text-white bg-[#7F3C09]">
                    <h2 className="text-xl sm:text-2xl font-bold">
                        Detalle de Usuario
                    </h2>
                    <p className="text-sm opacity-80">
                        Información del usuario del sistema
                    </p>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-5 overflow-y-auto">

                    {/* USER INFO */}
                    <div className="flex items-center gap-4">
                        <img
                            src={avatarSrc}
                            alt={user.username}
                            className="w-16 h-16 rounded-full object-cover border-2 border-[#7F3C09]/30"
                        />
                        <div>
                            <p className="font-bold text-[#2C1506] text-lg">
                                {[user.name, user.surname].filter(Boolean).join(" ")}
                            </p>
                            <p className="text-sm text-[#7F3C09]/70">
                                @{user.username}
                            </p>
                        </div>
                    </div>

                    {/* DATA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-[#F3F8F2] rounded-lg p-3 border border-[#7F3C09]/10">
                            <p className="text-xs text-[#7F3C09]/60">ID</p>
                            <p className="text-sm font-medium break-all text-[#2C1506]">
                                {user.id}
                            </p>
                        </div>

                        <div className="bg-[#F3F8F2] rounded-lg p-3 border border-[#7F3C09]/10">
                            <p className="text-xs text-[#7F3C09]/60">Email</p>
                            <p className="text-sm font-medium text-[#2C1506]">
                                {user.email}
                            </p>
                        </div>

                        <div className="bg-[#F3F8F2] rounded-lg p-3 border border-[#7F3C09]/10">
                            <p className="text-xs text-[#7F3C09]/60">Nombre</p>
                            <p className="text-sm font-medium text-[#2C1506]">
                                {user.name || "-"}
                            </p>
                        </div>

                        <div className="bg-[#F3F8F2] rounded-lg p-3 border border-[#7F3C09]/10">
                            <p className="text-xs text-[#7F3C09]/60">Apellido</p>
                            <p className="text-sm font-medium text-[#2C1506]">
                                {user.surname || "-"}
                            </p>
                        </div>
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="block text-sm font-semibold text-[#2C1506] mb-1">
                            Rol
                        </label>
                        <select
                            defaultValue={user.role}
                            className="w-full px-3 py-2 rounded-lg border border-[#7F3C09]/40 bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#7F3C09]/40 text-[#2C1506]"
                        >
                            <option value="USER_ROLE">Usuario</option>
                            <option value="ADMIN_ROLE">Administrador</option>
                        </select>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-4 border-t border-[#7F3C09]/20">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                    >
                        Cerrar
                    </button>

                    <button
                        className="w-full sm:w-auto px-5 py-2 rounded-lg text-[#F5F5DC] font-medium bg-[#7F3C09] hover:bg-[#2C1506] transition shadow"
                    >
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
};