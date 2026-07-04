import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { axiosAdmin } from "../../../shared/api/api";

const STAFF_ROLES = ["GERENTE_ROLE", "CHEF_ROLE", "MESERO_ROLE"];

const getArrayData = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  return [];
};

const formatNumber = (value) => new Intl.NumberFormat("es-MX").format(value);

export const StatisticsOverview = () => {
  const [stats, setStats] = useState({
    branches: 0,
    staff: 0,
    staffAssigned: 0,
    orders: 0,
    menuItems: 0,
    products: 0,
    reservations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [branchesRes, usersRes, ordersRes, menuRes, productsRes, reservationsRes] = await Promise.all([
          axiosAdmin.get("/branch").catch(() => ({ data: [] })),
          axiosAdmin.get("/users").catch(() => ({ data: [] })),
          axiosAdmin.get("/order").catch(() => ({ data: [] })),
          axiosAdmin.get("/menu").catch(() => ({ data: [] })),
          axiosAdmin.get("/product").catch(() => ({ data: [] })),
          axiosAdmin.get("/reservation").catch(() => ({ data: [] })),
        ]);

        const branches = getArrayData(branchesRes);
        const users = getArrayData(usersRes);
        const orders = getArrayData(ordersRes);
        const menuItems = getArrayData(menuRes);
        const products = getArrayData(productsRes);
        const reservations = getArrayData(reservationsRes);

        const staffUsers = users.filter((user) => STAFF_ROLES.includes(user.rol));
        const assignedStaffCount = branches.reduce(
          (sum, branch) => sum + (branch.assignedStaff?.length || 0),
          0,
        );

        setStats({
          branches: branches.length,
          staff: staffUsers.length,
          staffAssigned: assignedStaffCount,
          orders: orders.length,
          menuItems: menuItems.length,
          products: products.length,
          reservations: reservations.length,
        });
      } catch (loadError) {
        setError("No fue posible cargar las estadísticas en este momento.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = useMemo(
    () => [
      {
        title: "Sucursales",
        value: formatNumber(stats.branches),
        helper: "Unidades operativas registradas",
        icon: "🏢",
        accent: "from-rose-50 to-red-50 text-rose-700",
      },
      {
        title: "Personal",
        value: formatNumber(stats.staff),
        helper: "Empleados de cocina, servicio y gestión",
        icon: "👥",
        accent: "from-amber-50 to-orange-50 text-amber-700",
      },
      {
        title: "Personal asignado",
        value: formatNumber(stats.staffAssigned),
        helper: "Asignaciones activas a sucursales",
        icon: "🧑‍🍳",
        accent: "from-emerald-50 to-green-50 text-emerald-700",
      },
      {
        title: "Órdenes",
        value: formatNumber(stats.orders),
        helper: "Pedidos registrados en el sistema",
        icon: "🧾",
        accent: "from-sky-50 to-cyan-50 text-sky-700",
      },
      {
        title: "Menú",
        value: formatNumber(stats.menuItems),
        helper: "Platillos disponibles",
        icon: "🍽️",
        accent: "from-violet-50 to-fuchsia-50 text-violet-700",
      },
      {
        title: "Reservaciones",
        value: formatNumber(stats.reservations),
        helper: "Solicitudes de reserva activas",
        icon: "📅",
        accent: "from-indigo-50 to-blue-50 text-indigo-700",
      },
    ],
    [stats],
  );

  const comparisonData = useMemo(() => {
    const data = [
      { label: "Sucursales", value: stats.branches },
      { label: "Personal", value: stats.staff },
      { label: "Órdenes", value: stats.orders },
      { label: "Reservas", value: stats.reservations },
    ];
    const maxValue = Math.max(...data.map((item) => item.value), 1);
    return data.map((item) => ({ ...item, percentage: (item.value / maxValue) * 100 }));
  }, [stats]);

  const coveragePercent = stats.staff > 0 ? Math.min(100, Math.round((stats.staffAssigned / stats.staff) * 100)) : 0;

  return (
    <section className="space-y-6 p-4 max-w-7xl mx-auto box-border w-full overflow-x-hidden">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C1506]">Estadísticas generales</h1>
          <p className="text-sm text-[#2C1506]/75 mt-1">
            Resumen operativo del restaurante con los datos más relevantes del día a día.
          </p>
        </div>
        <div className="rounded-2xl border border-[#C00000]/10 bg-[#FFF8F0] px-4 py-3 text-sm text-[#2C1506]">
          <span className="font-semibold">Productos en stock:</span> {formatNumber(stats.products)}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 rounded-3xl border border-dashed border-[#C00000]/20 bg-white">
          <Spinner className="h-10 w-10 text-[#C00000]" />
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div key={card.title} className={`rounded-3xl border border-[#C00000]/10 bg-gradient-to-br ${card.accent} p-5 shadow-sm`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium opacity-80">{card.title}</p>
                    <p className="mt-2 text-3xl font-bold">{card.value}</p>
                  </div>
                  <div className="text-3xl">{card.icon}</div>
                </div>
                <p className="mt-3 text-sm opacity-80">{card.helper}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-[#C00000]/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#2C1506]">Comparativo operativo</h2>
              <div className="mt-4 space-y-3">
                {comparisonData.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-sm text-[#2C1506]">
                      <span>{item.label}</span>
                      <span className="font-semibold">{formatNumber(item.value)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#FFF8F0]">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-[#C00000] to-[#FF6B35]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#C00000]/10 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#2C1506]">Cobertura de personal</h2>
              <div className="mt-4 flex flex-col items-center gap-4">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#FFF8F0]">
                  <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                    <circle cx="60" cy="60" r="48" stroke="#F3E6D8" strokeWidth="12" fill="none" />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="#C00000"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={301.59}
                      strokeDashoffset={301.59 - (301.59 * coveragePercent) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-2xl font-bold text-[#2C1506]">{coveragePercent}%</p>
                    <p className="text-xs text-[#2C1506]/70">asignado</p>
                  </div>
                </div>
                <p className="text-center text-sm text-[#2C1506]/75">
                  {formatNumber(stats.staffAssigned)} asignaciones activas sobre {formatNumber(stats.staff)} perfiles de personal.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
