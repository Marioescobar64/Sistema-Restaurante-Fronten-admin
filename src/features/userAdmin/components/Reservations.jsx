export const Reservations = () => {
  const reservations = [
    {
      _id: "1",
      fieldId: { fieldName: "Cancha Central" },
      userId: "usuario123",
      date: "12/04/2026",
      time: "10:00 - 11:00",
      status: "PENDING",
    },
    {
      _id: "2",
      fieldId: { fieldName: "Cancha Norte" },
      userId: "usuario456",
      date: "13/04/2026",
      time: "14:00 - 15:00",
      status: "CONFIRMED",
    },
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#4A2C0A]">
          Gestión de Reservaciones
        </h1>
        <p className="text-[#4A2C0A]/70 text-sm mt-1">
          Administra y confirma las reservaciones
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reservations.map((reservation) => {
          const isConfirmed = reservation.status === "CONFIRMED";

          return (
            <div
              key={reservation._id}
              className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-lg 
                         hover:shadow-2xl transition-all duration-300 
                         border border-[#A0724A]/20 hover:scale-[1.02]"
            >
              <div className="p-5">

                {/* TITLE */}
                <h2 className="text-lg font-semibold text-[#4A2C0A]">
                  {reservation.fieldId.fieldName}
                </h2>

                <p className="text-sm text-[#4A2C0A]/50 truncate">
                  Usuario: {reservation.userId}
                </p>

                {/* BADGES */}
                <div className="flex gap-2 mt-3 flex-wrap">

                  <span className="px-3 py-1 text-xs rounded-full 
                                   bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                    {reservation.date}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full 
                                   bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                    {reservation.time}
                  </span>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      isConfirmed
                        ? "bg-[#2C1506] text-[#F5ECD9]"
                        : "bg-[#7F3C09] text-[#F5ECD9]"
                    }`}
                  >
                    {isConfirmed ? "Confirmada" : "Pendiente"}
                  </span>

                </div>

                {/* ACTION */}
                <div className="mt-5">
                  <button
                    disabled={isConfirmed}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      isConfirmed
                        ? "bg-[#E8D5B7] text-[#4A2C0A] cursor-not-allowed"
                        : "bg-[#A0724A] text-[#F5ECD9] hover:bg-[#7A5235]"
                    }`}
                  >
                    {isConfirmed ? "✔ Confirmada" : "✔ Confirmar"}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {reservations.length === 0 && (
        <div className="text-center text-[#4A2C0A]/50 mt-10 text-sm">
          No hay reservaciones registradas
        </div>
      )}

    </div>
  );
};