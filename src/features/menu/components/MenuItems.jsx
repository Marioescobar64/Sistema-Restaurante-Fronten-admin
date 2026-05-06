export const MenuItems = () => {
  const menuItems = [
    {
      id: "m1",
      saucerName: "Papas a la Mexicana",
      categoryType: "Almuerzo",
      description: "Papas rostizadas con jalapeños, cebolla y queso fundido.",
      price: 10.5,
      isActive: true,
    },
    {
      id: "m2",
      saucerName: "Pasta Cremosa",
      categoryType: "Cena",
      description: "Pasta con salsa de crema, pollo y hierbas frescas.",
      price: 11.99,
      isActive: true,
    },
    {
      id: "m3",
      saucerName: "Bruschetta Especial",
      categoryType: "Entradas",
      description: "Pan tostado con tomate, albahaca y aceite de oliva.",
      price: 6.25,
      isActive: false,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Menú</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo visual de cómo se vería el catálogo de platillos.
          </p>
        </div>
        <button className="btn-primary px-5 py-3">Agregar platillo</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {menuItems.map((item) => (
          <article
            key={item.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">{item.saucerName}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{item.categoryType}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {item.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <p className="text-sm text-[#2C1506]/75 mb-5">{item.description}</p>
            <div className="flex items-center justify-between text-[#2C1506] font-semibold">
              <span>Precio</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
