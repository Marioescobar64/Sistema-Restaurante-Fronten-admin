import React from "react";

const events = [
  {
    id: "e1",
    nombreEvento: "Noche de tacos",
    observaciones: "Evento temático con bebidas especiales y música en vivo.",
    isActive: true,
    fecha: "2026-05-05T18:00:00Z",
    horaInicio: "18:00",
    horaFin: "22:00",
    idDiseno: "EV-001",
  },
  {
    id: "e2",
    nombreEvento: "Brunch dominical",
    observaciones: "Menú especial de brunch para familias y amigos.",
    isActive: true,
    fecha: "2026-05-11T10:00:00Z",
    horaInicio: "10:00",
    horaFin: "14:00",
    idDiseno: "EV-002",
  },
  {
    id: "e3",
    nombreEvento: "Cena maridaje",
    observaciones: "Experiencia de vinos certificados acompañando platillos estrella.",
    isActive: false,
    fecha: "2026-05-18T20:00:00Z",
    horaInicio: "20:00",
    horaFin: "23:00",
    idDiseno: "EV-003",
  },
];

export const Events = () => {
  return (
    /* CAMBIO RESPONSIVO: Se agregó un ancho máximo de contenedor y un resguardo para evitar desplazamientos horizontales */
    <section className="space-y-6 p-4 max-w-7xl mx-auto box-border w-full overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          {/* CAMBIO RESPONSIVO: Título fluido que se encoge un poco en pantallas muy pequeñas */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C1506]">Eventos</h1>
          <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de la programación de eventos del restaurante.
          </p>
        </div>
      </div>

      {/* GRID DE EVENTOS */}
      {/* CAMBIO RESPONSIVO: Control milimétrico de columnas: 1 en móviles, 2 en tablets (md) y 3 en pantallas muy grandes (xl) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full box-border">
        {events.map((event) => (
          <article
            key={event.id}
            /* CAMBIO RESPONSIVO: Padding controlado (p-4 en móvil, p-6 en PC) y hover exclusivo para computadoras (md:hover) */
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/20 p-4 sm:p-6 shadow-sm md:hover:-translate-y-1 transition-transform duration-200 w-full box-border flex flex-col justify-between"
          >
            <div>
              {/* HEADER DEL EVENTO */}
              {/* CAMBIO RESPONSIVO: Aligned to top (items-start) para que si el texto es largo, la etiqueta verde/roja no se deforme */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="max-w-[75%]">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#2C1506] break-words">{event.nombreEvento}</h2>
                  <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1 break-words">{event.observaciones}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-semibold shrink-0 ${
                    event.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {event.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>

              {/* DETALLES */}
              {/* CAMBIO RESPONSIVO: Textos adaptables text-xs en móviles para que quepan las fechas largas de JS sin romperse en bloques feos */}
              <div className="grid gap-1.5 text-xs sm:text-sm text-[#2C1506]/80 mb-2 border-t border-[#C00000]/10 pt-3">
                <div className="capitalize">
                  <span className="font-medium text-[#2C1506]">Fecha:</span> {new Date(event.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div><span className="font-medium text-[#2C1506]">Inicio:</span> {event.horaInicio} hrs</div>
                <div><span className="font-medium text-[#2C1506]">Fin:</span> {event.horaFin} hrs</div>
              </div>
            </div>

            {/* ID DE DISEÑO */}
            <div className="text-[10px] sm:text-xs text-[#C00000]/80 font-medium mt-3 border-t border-[#C00000]/5 pt-2">
              ID de diseño: {event.idDiseno || event.id}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};