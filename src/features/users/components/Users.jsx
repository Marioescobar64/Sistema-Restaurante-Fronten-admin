export const Users = () => {
    const users = []; // 🔹 conectar luego

    return (
        <div className="p-4 md:p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C1506]">
                        Usuarios del Sistema
                    </h1>
                    <p className="text-[#7F3C09]/70 text-sm">
                        Administra usuarios y permisos del restaurante
                    </p>
                </div>

                <button className="bg-[#7F3C09] px-4 py-2 rounded-lg text-[#F5F5DC] hover:bg-[#2C1506] transition shadow">
                    + Agregar Usuario
                </button>
            </div>

            {/* FILTROS */}
            <div className="bg-[#F5F5DC] rounded-xl border border-[#7F3C09]/20 shadow-sm p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    <input
                        placeholder="Buscar usuario..."
                        className="md:col-span-2 w-full px-3 py-2 rounded-lg border border-[#7F3C09]/30 bg-[#F3F8F2] text-[#2C1506] outline-none focus:ring-2 focus:ring-[#7F3C09]/40"
                    />

                    <select className="w-full px-3 py-2 rounded-lg border border-[#7F3C09]/30 bg-[#F3F8F2] text-[#2C1506] outline-none">
                        <option>Todos los roles</option>
                        <option>Administrador</option>
                        <option>Usuario</option>
                    </select>

                </div>
            </div>

            {/* TABLA */}
            <div className="bg-[#F5F5DC] rounded-xl border border-[#7F3C09]/20 shadow-sm overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">

                        {/* HEADER */}
                        <thead className="bg-[#7F3C09]/10 text-[#2C1506]">
                            <tr>
                                <th className="text-left px-4 py-3">Usuario</th>
                                <th className="text-left px-4 py-3">Username</th>
                                <th className="text-left px-4 py-3">Rol</th>
                                <th className="text-right px-4 py-3">Acciones</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        className="px-4 py-8 text-center text-[#7F3C09]/60"
                                        colSpan={4}
                                    >
                                        No hay usuarios registrados
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="border-t border-[#7F3C09]/10 hover:bg-[#7F3C09]/5 transition"
                                    >
                                        <td className="px-4 py-3 font-medium text-[#2C1506]">
                                            {u.name} {u.surname}
                                        </td>

                                        <td className="px-4 py-3 text-[#7F3C09]">
                                            @{u.username}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    u.role === "ADMIN_ROLE"
                                                        ? "bg-[#7F3C09]/20 text-[#7F3C09]"
                                                        : "bg-[#2C1506]/10 text-[#2C1506]"
                                                }`}
                                            >
                                                {u.role === "ADMIN_ROLE"
                                                    ? "Administrador"
                                                    : "Usuario"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button className="px-3 py-1.5 rounded-lg bg-[#7F3C09] text-[#F5F5DC] text-xs font-semibold hover:bg-[#2C1506] transition">
                                                Ver Detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINACIÓN */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#7F3C09]/20 bg-[#F3F8F2]">
                    <p className="text-xs text-[#7F3C09]/70">
                        Mostrando 0 resultados
                    </p>

                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded border border-[#7F3C09]/30 text-sm text-[#2C1506] hover:bg-[#7F3C09]/10">
                            Anterior
                        </button>

                        <span className="px-2 py-1.5 text-sm text-[#2C1506]">
                            1 / 1
                        </span>

                        <button className="px-3 py-1.5 rounded border border-[#7F3C09]/30 text-sm text-[#2C1506] hover:bg-[#7F3C09]/10">
                            Siguiente
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};