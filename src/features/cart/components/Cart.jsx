import React from "react";

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
    idDiseno: "CART-001",
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
    idDiseno: "CART-002",
  },
];

export const Cart = () => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pagado":
        return "bg-green-100 text-green-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    /* CAMBIO RESPONSIVO: Ajuste del padding general para que respire en dispositivos móviles sin desbordarse */
    <section className="space-y-6 p-4 max-w-7xl mx-auto box-border w-full overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          {/* CAMBIO RESPONSIVO: Texto fluido text-2xl en móvil, text-3xl en pantallas más grandes */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C1506]">Carritos</h1>
          <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1">
            Ejemplo de carritos de compra con contenido ya integrado.
          </p>
        </div>
      </div>

      {/* GRID DE CARRITOS */}
      {/* CAMBIO RESPONSIVO: En móvil es una sola columna vertical, a partir de tablets/monitores se divide en un grid balanceado de 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full box-border">
        {carts.map((cart) => (
          <article
            key={cart.id}
            /* CAMBIO RESPONSIVO: Se modificó el padding a 'p-4 sm:p-6' y el hover se aplica exclusivamente en pantallas con mouse (md:hover) */
            className="bg-[#FFF8F0]/90 rounded-3xl border border-[#C00000]/20 p-4 sm:p-6 shadow-sm md:hover:-translate-y-1 transition-transform duration-200 w-full box-border flex flex-col justify-between"
          >
            <div>
              {/* HEADER DEL CARRITO */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#2C1506]">
                    Carrito #{cart.orderId}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#2C1506]/80 mt-1">{cart.items.length} artículos</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${getStatusBadge(cart.status)}`}
                >
                  {cart.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl sm:rounded-3xl bg-white/80 p-3 sm:p-4 border border-[#C00000]/10 box-border"
                  >
                    <div className="flex items-start justify-between text-[#2C1506] font-semibold gap-2">
                      <span className="text-sm sm:text-base break-words max-w-[80%]">{item.name}</span>
                      <span className="text-sm sm:text-base shrink-0">x{item.quantity}</span>
                    </div>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#2C1506]/75">
                      Subtotal: ${item.subtotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL Y DETALLES */}
            <div>
              <div className="mt-5 flex items-center justify-between text-[#2C1506] font-semibold border-t border-[#C00000]/10 pt-4 text-sm sm:text-base">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>

              {/* ID DE DISEÑO */}
              <div className="text-[10px] sm:text-xs text-[#C00000]/80 font-medium mt-2">
                ID de diseño: {cart.idDiseno || cart.id}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};