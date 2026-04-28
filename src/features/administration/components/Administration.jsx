const settings = [
  {
    id: "a1",
    restaurantName: "Papas Luigi",
    categoryType: "Restaurante familiar",
    capacity: 60,
    owner: "Luis Martínez",
  },
  {
    id: "a2",
    restaurantName: "Bistro Central",
    categoryType: "Comida rápida",
    capacity: 30,
    owner: "Ana Méndez",
  },
];

export const Administration = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Administración</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de los datos clave de administración del restaurante.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((item) => (
          <article
            key={item.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#2C1506]">{item.restaurantName}</h2>
              <p className="text-sm text-[#2C1506]/80 mt-1">{item.categoryType}</p>
            </div>
            <div className="grid gap-3 text-sm text-[#2C1506]/80">
              <div>Propietario: {item.owner}</div>
              <div>Capacidad: {item.capacity} personas</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
