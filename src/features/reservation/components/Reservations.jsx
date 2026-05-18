const reservations = [
  {
    id: "r1",
    usuario: "María Lopez",
    mesa: 8,
    cantidadPersonas: 4,
    estado: "Activa",
    descripcion: "Cena familiar con preferencia de mesa junto a la ventana.",
    fecha: "2026-05-01T19:00:00Z",
    hora: "19:00",
  },
  {
    id: "r2",
    usuario: "Carlos Rivera",
    mesa: 3,
    cantidadPersonas: 2,
    estado: "Finalizada",
    descripcion: "Reservación romántica con postre incluido.",
    fecha: "2026-04-28T20:30:00Z",
    hora: "20:30",
  },
  {
    id: "r3",
    usuario: "Ana Fernández",
    mesa: 12,
    cantidadPersonas: 6,
    estado: "Cancelada",
    descripcion: "Grupo de amigos - cancelado por lluvia.",
    fecha: "2026-04-29T18:00:00Z",
    hora: "18:00",
  },
];

// Función para obtener el estilo de estado según tipo
const estadoStyle = (estado) => {
  switch (estado) {
    case "Activa":
      return "bg-green-100 text-green-700";
    case "Finalizada":
      return "bg-gray-100 text-gray-700";
    case "Cancelada":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const Reservations = () => {
  return (
    <section className="space-y-6 px-1 sm:px-0">
      {/* HEADER RESPONSIVO */}
      <div className="flex flex-col gap-3 text-center sm:text-left md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C1506] m-0">
            Reservaciones
          </h1>
          <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1.5 mb-0">
            Ejemplo visual de cómo se verían las reservaciones integradas.
          </p>
        </div>
      </div>

      {/* GRID CONFIGURADO PARA COLAPSAR EN MÓVILES */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reservations.map((reservation) => (
          <article
            key={reservation.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#2C1506] truncate m-0">
                    {reservation.usuario}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1 mb-0">
                    Mesa {reservation.mesa} · {reservation.cantidadPersonas} personas
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap flex-shrink-0 ${estadoStyle(
                    reservation.estado
                  )}`}
                >
                  {reservation.estado}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#2C1506]/75 mb-4 line-clamp-3">
                {reservation.descripcion}
              </p>
            </div>

            {/* DETALLES DE FECHA Y HORA */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-[#2C1506]/80 pt-3 border-t border-[#2C1506]/10">
              <div>
                <span className="font-medium">Fecha:</span>{" "}
                {new Date(reservation.fecha).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="text-right sm:text-left">
                <span className="font-medium">Hora:</span> {reservation.hora}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};