export const Products = () => {
  const products = [
    {
      id: "p1",
      nombre: "Papas al Horno",
      categoria: "Entradas",
      descripcion: "Papas doradas con salsa especial y queso gratinado.",
      precio: 7.5,
      isActive: true,
    },
    {
      id: "p2",
      nombre: "Pizza Papa Luigi",
      categoria: "Platillos principales",
      descripcion: "Base crocante, salsa de tomate artesanal y toppings clásicos.",
      precio: 12.9,
      isActive: true,
    },
    {
      id: "p3",
      nombre: "Ensalada Fresh",
      categoria: "Acompañamientos",
      descripcion: "Mezcla de vegetales frescos y aderezo ligero de la casa.",
      precio: 5.8,
      isActive: false,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Productos</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Vista de ejemplo con productos integrados en la plataforma.
          </p>
        </div>
        <button className="btn-primary px-5 py-3">Agregar producto</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">{product.nombre}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{product.categoria}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {product.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <p className="text-sm text-[#2C1506]/75 mb-5">{product.descripcion}</p>
            <div className="flex items-center justify-between text-[#2C1506] font-semibold">
              <span>Precio</span>
              <span>${product.precio.toFixed(2)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
