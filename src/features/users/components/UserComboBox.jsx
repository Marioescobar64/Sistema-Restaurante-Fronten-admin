export const UserComboBox = ({ value, error, disabled, users = [] }) => {
    const selectedUser = users.find((u) => u.id === value);

    return (
        <div className="relative">
            <label className="text-sm font-semibold text-[#2C1506] mb-1 block">
                Usuario asignado
            </label>

            {/* INPUT */}
            <div
                className={`flex items-center w-full px-3 py-2 rounded-lg border shadow-sm transition
                ${disabled
                        ? "bg-gray-200 border-gray-200 text-gray-500"
                        : "bg-[#F5F5DC] border-[#7F3C09]/40"}
                ${error ? "border-red-500" : ""}
                `}
            >
                <div className="flex-1 truncate">
                    {selectedUser ? (
                        <span className="text-[#2C1506]">
                            {selectedUser.name} {selectedUser.surname} (@{selectedUser.username})
                        </span>
                    ) : (
                        <span className="text-[#7F3C09]/50">
                            Seleccionar usuario...
                        </span>
                    )}
                </div>

                {!disabled && (
                    <span className="text-[#7F3C09]/60 ml-2">⌄</span>
                )}
            </div>

            {/* DROPDOWN */}
            <div className="absolute z-50 w-full mt-2 bg-[#F5F5DC] border border-[#7F3C09]/20 rounded-xl shadow-xl max-h-60 flex flex-col overflow-hidden">

                {/* SEARCH */}
                <div className="p-2 border-b border-[#7F3C09]/20 bg-[#F3F8F2] flex items-center gap-2">
                    <span className="text-[#7F3C09]/60 text-sm">🔍</span>
                    <input
                        type="text"
                        className="bg-transparent border-none text-sm w-full p-1 outline-none text-[#2C1506]"
                        placeholder="Buscar usuario..."
                    />
                </div>

                {/* LIST */}
                <div className="overflow-y-auto py-1">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm text-[#2C1506] hover:bg-[#7F3C09]/10 transition"
                            >
                                <div className="flex flex-col truncate mr-2">
                                    <span className="truncate font-medium">
                                        {user.name} {user.surname}
                                    </span>
                                    <span className="text-xs text-[#7F3C09]/70 truncate">
                                        @{user.username}
                                    </span>
                                </div>

                                {value === user.id && (
                                    <span className="text-[#7F3C09] text-sm">✔</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-sm text-[#7F3C09]/60">
                            No hay usuarios disponibles
                        </div>
                    )}
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <p className="text-red-600 text-xs mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
};