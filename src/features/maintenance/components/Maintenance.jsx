const maintenanceRecords = [
  {
    id: "m1",
    mesa: 5,
    ubicacion: "Zona interior",
    status: "En reparación",
    capacity: 4,
  },
  {
    id: "m2",
    mesa: 2,
    ubicacion: "Terraza",
    status: "Fuera de servicio",
    capacity: 2,
  },
  {
    id: "m3",
    mesa: 9,
    ubicacion: "Salón principal",
    status: "Disponible",
    capacity: 6,
  },
];

export const Maintenance = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Mantenimiento</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo visual de la gestión de mesas en mantenimiento.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {maintenanceRecords.map((record) => (
          <article
            key={record.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">Mesa {record.mesa}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{record.ubicacion}</p>
              </div>
              <span className="rounded-full bg-[#FFE9D3] px-3 py-1 text-xs font-semibold text-[#7F3C09]">
                {record.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#2C1506] font-semibold">
              <span>Capacidad</span>
              <span>{record.capacity} personas</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};