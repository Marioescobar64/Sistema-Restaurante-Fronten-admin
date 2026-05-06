const carts = [
  {
    id: "c1",
    orderId: "1245",
    status: "Pagado",
    total: 27.5,
    items: [
      { name: "Pizza Papa Luigi", quantity: 1, subtotal: 12.9 },
      { name: "Papas al Horno", quantity: 2, subtotal: 14.6 },
    ],
  },
  {
    id: "c2",
    orderId: "1246",
    status: "Pendiente",
    total: 19.5,
    items: [
      { name: "Ensalada Fresh", quantity: 1, subtotal: 5.8 },
      { name: "Sopa del Día", quantity: 2, subtotal: 13.7 },
    ],
  },
];

export const Cart = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Carritos</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de carritos de compra con contenido ya integrado.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {carts.map((cart) => (
          <article
            key={cart.id}
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/10 p-6 shadow-sm hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-[#2C1506]">Carrito #{cart.orderId}</h2>
                <p className="text-sm text-[#2C1506]/80 mt-1">{cart.items.length} artículos</p>
              </div>
              <span className="rounded-full bg-[#FFE9D3] px-3 py-1 text-xs font-semibold text-[#7F3C09]">
                {cart.status}
              </span>
            </div>

            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.name} className="rounded-3xl bg-white/80 p-4 border border-[#C00000]/10">
                  <div className="flex items-center justify-between text-[#2C1506] font-semibold">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                  <div className="mt-2 text-sm text-[#2C1506]/75">Subtotal: ${item.subtotal.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-[#2C1506] font-semibold">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
