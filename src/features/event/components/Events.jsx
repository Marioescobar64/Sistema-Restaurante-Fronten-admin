const events = [
  {
    id: "e1",
    nombreEvento: "Noche de tacos",
    observaciones: "Evento temático con bebidas especiales y música en vivo.",
    isActive: true,
    fecha: "2026-05-05T18:00:00Z",
    horaInicio: "18:00",
    horaFin: "22:00",
  },
  {
    id: "e2",
    nombreEvento: "Brunch dominical",
    observaciones: "Menú especial de brunch para familias y amigos.",
    isActive: true,
    fecha: "2026-05-11T10:00:00Z",
    horaInicio: "10:00",
    horaFin: "14:00",
  },
  {
    id: "e3",
    nombreEvento: "Cena maridaje",
    observaciones: "Experiencia de vinos certificados acompañando platillos estrella.",
    isActive: false,
    fecha: "2026-05-18T20:00:00Z",
    horaInicio: "20:00",
    horaFin: "23:00",
  },
];

export const Events = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Eventos</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de la programación de eventos del restaurante.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">{event.nombreEvento}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{event.observaciones}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {event.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="grid gap-2 text-sm text-[#2C1506]/80">
              <div>Fecha: {new Date(event.fecha).toLocaleDateString()}</div>
              <div>Inicio: {event.horaInicio}</div>
              <div>Fin: {event.horaFin}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};