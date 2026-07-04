const ROLE_ALIASES = {
  gerente: ["GERENTE", "GERENTE_ROLE", "MANAGER", "MANAGER_ROLE", "ADMIN", "ADMIN_ROLE"],
  chef: ["CHEF", "CHEF_ROLE", "COCINERO", "COCINA", "KITCHEN"],
  mesero: ["MESERO", "MESERO_ROLE", "WAITER", "WAITER_ROLE", "CAMARERO", "SERVER"],
};

const ROLE_LABELS = {
  gerente: "Gerente",
  chef: "Chef",
  mesero: "Mesero",
};

export const normalizeRole = (roleValue) => {
  const rawRole = (roleValue ?? "").toString().trim().toUpperCase();

  if (!rawRole) return null;

  if (ROLE_ALIASES.gerente.some((alias) => rawRole.includes(alias))) return "gerente";
  if (ROLE_ALIASES.chef.some((alias) => rawRole.includes(alias))) return "chef";
  if (ROLE_ALIASES.mesero.some((alias) => rawRole.includes(alias))) return "mesero";

  return null;
};

export const getRoleLabel = (roleValue) => ROLE_LABELS[normalizeRole(roleValue)] || "Usuario";

export const getDefaultDashboardPath = (roleValue) => {
  const role = normalizeRole(roleValue);

  if (role === "chef" || role === "mesero") return "/dashboard/ordenes";

  return "/dashboard/estadisticas";
};

export const getVisibleMenuItems = (roleValue) => {
  const role = normalizeRole(roleValue);

  const baseItems = [
    { label: "Estadísticas", path: "/dashboard/estadisticas", icon: "📊" },
    { label: "Órdenes", path: "/dashboard/ordenes", icon: "🧾" },
  ];

  if (role === "gerente") {
    return [
      ...baseItems,
      { label: "Platillos", path: "/dashboard/platillos", icon: "🍕" },
      { label: "Stock", path: "/dashboard/productos", icon: "🛒" },
      { label: "Reservaciones", path: "/dashboard/reservaciones", icon: "📅" },
      { label: "Mesas", path: "/dashboard/mesas", icon: "🍽️" },
      { label: "Eventos", path: "/dashboard/eventos", icon: "🎉" },
      { label: "Mantenimiento", path: "/dashboard/mantenimiento", icon: "🛠️" },
      { label: "Carritos", path: "/dashboard/carritos", icon: "🛍️" },
      { label: "Personal", path: "/dashboard/administracion", icon: "⚙️" },
      { label: "Sucursales", path: "/dashboard/sucursales", icon: "🏢" },
    ];
  }

  if (role === "chef") {
    return [
      ...baseItems,
      { label: "Platillos", path: "/dashboard/platillos", icon: "🍕" },
      { label: "Stock", path: "/dashboard/productos", icon: "🛒" },
    ];
  }

  if (role === "mesero") {
    return [
      ...baseItems,
      { label: "Mesas", path: "/dashboard/mesas", icon: "🍽️" },
      { label: "Carritos", path: "/dashboard/carritos", icon: "🛍️" },
    ];
  }

  return baseItems;
};

export const canAccessRoute = (roleValue, routePath) => {
  const role = normalizeRole(roleValue);

  if (!role) return false;

  const allowedRoutes = {
    gerente: [
      "/dashboard",
      "/dashboard/estadisticas",
      "/dashboard/platillos",
      "/dashboard/productos",
      "/dashboard/ordenes",
      "/dashboard/reservaciones",
      "/dashboard/mesas",
      "/dashboard/eventos",
      "/dashboard/mantenimiento",
      "/dashboard/carritos",
      "/dashboard/administracion",
      "/dashboard/sucursales",
    ],
    chef: ["/dashboard", "/dashboard/ordenes", "/dashboard/platillos", "/dashboard/productos"],
    mesero: ["/dashboard", "/dashboard/ordenes", "/dashboard/mesas", "/dashboard/carritos"],
  };

  return allowedRoutes[role]?.includes(routePath) ?? false;
};
