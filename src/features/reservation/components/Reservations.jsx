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

export const Reservations = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Reservaciones</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo visual de cómo se verían las reservaciones integradas.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reservations.map((reservation) => (
          <article
            key={reservation.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">{reservation.usuario}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">
                  Mesa {reservation.mesa} · {reservation.cantidadPersonas} personas
                </p>
              </div>
              <span className="rounded-full bg-[#FFE9D3] px-3 py-1 text-xs font-semibold text-[#7F3C09]">
                {reservation.estado}
              </span>
            </div>
            <p className="text-sm text-[#2C1506]/75 mb-4">{reservation.descripcion}</p>
            <div className="grid gap-2 text-sm text-[#2C1506]/80">
              <div>Fecha: {new Date(reservation.fecha).toLocaleDateString()}</div>
              <div>Hora: {reservation.hora}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
