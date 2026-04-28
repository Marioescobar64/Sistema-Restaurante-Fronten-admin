const tables = [
  {
    id: "t1",
    numeroMesa: 1,
    descripcion: "Mesa para dos junto a la ventana",
    estado: "Disponible",
    capacidad: 2,
  },
  {
    id: "t2",
    numeroMesa: 4,
    descripcion: "Mesa para cuatro en el centro",
    estado: "Ocupada",
    capacidad: 4,
  },
  {
    id: "t3",
    numeroMesa: 8,
    descripcion: "Mesa amplia para grupo familiar",
    estado: "En limpieza",
    capacidad: 6,
  },
];

export const Tables = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Mesas</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de gestión de mesas con estados y capacidad.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tables.map((table) => (
          <article
            key={table.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">Mesa {table.numeroMesa}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{table.descripcion}</p>
              </div>
              <span className="rounded-full bg-[#FFE9D3] px-3 py-1 text-xs font-semibold text-[#7F3C09]">
                {table.estado}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#2C1506] font-semibold">
              <span>Capacidad</span>
              <span>{table.capacidad} personas</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};