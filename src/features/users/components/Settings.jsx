export const Menu = () => {
    const dishes = [
        {
            _id: "1",
            name: "Pizza Pepperoni",
            category: "PIZZAS",
            price: "Q80",
            status: "DISPONIBLE",
        },
        {
            _id: "2",
            name: "Hamburguesa Clásica",
            category: "HAMBURGUESAS",
            price: "Q45",
            status: "AGOTADO",
        },
    ];

    return (
        <div className="p-4 md:p-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#2C1506]">
                        Gestión de Menú
                    </h1>
                    <p className="text-[#7F3C09]/70 text-sm">
                        Administra los platillos del restaurante
                    </p>
                </div>

                <button className="bg-[#7F3C09] px-4 py-2 rounded-lg text-[#F5F5DC] hover:bg-[#2C1506] transition shadow">
                    + Agregar Platillo
                </button>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dishes.map((dish) => {
                    const isAvailable = dish.status === "DISPONIBLE";

                    return (
                        <div
                            key={dish._id}
                            className="bg-[#F5F5DC] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#7F3C09]/20 hover:scale-[1.02]"
                        >
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-[#2C1506]">
                                    {dish.name}
                                </h2>

                                {/* BADGES */}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-[#7F3C09]/10 text-[#7F3C09] font-medium">
                                        {dish.category}
                                    </span>

                                    <span
                                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                                            isAvailable
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {dish.status}
                                    </span>
                                </div>

                                {/* INFO */}
                                <p className="text-lg font-semibold text-[#7F3C09] mt-3">
                                    {dish.price}
                                </p>

                                {/* BOTONES */}
                                <div className="flex gap-3 mt-5">
                                    <button className="flex-1 py-2 rounded-lg bg-[#7F3C09] text-[#F5F5DC] font-medium hover:bg-[#2C1506] transition">
                                        ✏️ Editar
                                    </button>

                                    <button className="flex-1 py-2 rounded-lg bg-[#440F0F] text-white font-medium hover:opacity-90 transition">
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* EMPTY */}
            {dishes.length === 0 && (
                <div className="text-center text-[#7F3C09]/60 mt-10">
                    No hay platillos registrados
                </div>
            )}
        </div>
    );
};