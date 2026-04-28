const orders = [
  {
    id: "o1",
    nombrePedido: "Pedido #1245",
    estado: "Pendiente",
    total: 28.75,
    fechaPedido: "2026-04-25T12:20:00Z",
  },
  {
    id: "o2",
    nombrePedido: "Pedido #1246",
    estado: "En proceso",
    total: 42.0,
    fechaPedido: "2026-04-26T14:34:00Z",
  },
  {
    id: "o3",
    nombrePedido: "Pedido #1247",
    estado: "Entregado",
    total: 18.5,
    fechaPedido: "2026-04-26T16:10:00Z",
  },
];

export const Orders = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Órdenes</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">
            Vista de ejemplo con órdenes ya integradas en el panel.
          </p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-[#C00000]/10 p-6 shadow-sm overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-[#2C1506]/80">
              <th className="pb-3">Pedido</th>
              <th className="pb-3">Estado</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-[#FFF8F0]/95 rounded-3xl shadow-sm">
                <td className="px-4 py-4 text-[#2C1506]">{order.nombrePedido}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center rounded-full bg-[#FFE9D3] px-3 py-1 text-sm font-medium text-[#7F3C09]">
                    {order.estado}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#2C1506]">${order.total.toFixed(2)}</td>
                <td className="px-4 py-4 text-[#2C1506]/80">{new Date(order.fechaPedido).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
