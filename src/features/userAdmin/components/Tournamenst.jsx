export const Events = () => {
  const events = [
    {
      _id: "1",
      eventName: "Noche Italiana",
      type: "Cena Especial",
      status: "ACTIVO",
      capacity: 20,
      startDate: "01/05/2026",
      endDate: "01/05/2026",
    },
    {
      _id: "2",
      eventName: "Promoción Familiar",
      type: "Promoción",
      status: "FINALIZADO",
      capacity: 50,
      startDate: "01/04/2026",
      endDate: "10/04/2026",
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#4A2C0A]">
            Gestión de Eventos
          </h1>
          <p className="text-[#4A2C0A]/70 text-sm mt-1">
            Administra eventos y promociones del restaurante
          </p>
        </div>

        <button className="bg-[#7F3C09] px-5 py-2.5 rounded-lg text-[#F5ECD9] 
                           font-semibold hover:bg-[#2C1506] transition shadow-md">
          + Agregar Evento
        </button>

      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((e) => {
          const isActive = e.status === "ACTIVO";

          return (
            <div
              key={e._id}
              className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-lg 
                         hover:shadow-2xl transition-all duration-300 
                         border border-[#A0724A]/20 hover:scale-[1.02]"
            >

              <div className="p-5">

                <h2 className="text-lg font-semibold text-[#4A2C0A]">
                  {e.eventName}
                </h2>

                {/* BADGES */}
                <div className="flex gap-2 mt-2 flex-wrap">

                  <span className="px-3 py-1 text-xs rounded-full 
                                   bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                    {e.type}
                  </span>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      isActive
                        ? "bg-[#7F3C09] text-[#F5ECD9]"
                        : "bg-[#2C1506] text-[#F5ECD9]"
                    }`}
                  >
                    {isActive ? "Activo" : "Finalizado"}
                  </span>

                </div>

                {/* INFO */}
                <p className="text-sm text-[#4A2C0A]/50 mt-2">
                  Capacidad: {e.capacity} personas
                </p>

                <p className="text-sm text-[#4A2C0A]/50">
                  {e.startDate} - {e.endDate}
                </p>

                {/* BOTONES */}
                <div className="flex gap-3 mt-5">

                  <button className="flex-1 py-2 rounded-lg bg-[#A0724A] text-[#F5ECD9] 
                                     font-medium hover:bg-[#7A5235] transition">
                    ✏️ Editar
                  </button>

                  <button className="flex-1 py-2 rounded-lg bg-[#440F0F] text-[#F5ECD9] 
                                     font-medium hover:opacity-90 transition">
                    🗑️ Eliminar
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};