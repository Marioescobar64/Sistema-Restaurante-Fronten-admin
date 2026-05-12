import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Platillos", path: "/dashboard/platillos", icon: "🍕" },
    { label: "Productos", path: "/dashboard/productos", icon: "🛒" },
    { label: "Órdenes", path: "/dashboard/ordenes", icon: "🧾" },
    { label: "Reservaciones", path: "/dashboard/reservaciones", icon: "📅" },
    { label: "Mesas", path: "/dashboard/mesas", icon: "🍽️" },
    { label: "Eventos", path: "/dashboard/eventos", icon: "🎉" },
    { label: "Mantenimiento", path: "/dashboard/mantenimiento", icon: "🛠️" },
    { label: "Carritos", path: "/dashboard/carritos", icon: "🛍️" },
    { label: "Administración", path: "/dashboard/administracion", icon: "⚙️" },
  ];

  const handleLogout = () => {
    // Use the central auth store logout to keep state consistent
    const logout = useAuthStore.getState().logout;
    if (typeof logout === "function") logout();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="w-60 bg-[#FFF8F0]/95 backdrop-blur-md border-r border-[#C00000]/20 min-h-[calc(100vh-4rem)] p-4 shadow-sm flex flex-col">
      <ul className="space-y-2 flex-1">
        {items.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-black
                transition-all duration-150 ease-out
                hover:bg-[#C00000]/10 hover:scale-[1.03]
                active:scale-95 active:bg-[#C00000]/20
                ${isActive(item.path) ? "bg-[#C00000]/15 border-l-4 border-[#C00000]" : ""}
              `}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        className="
          w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-white
          bg-[#C00000]
          transition-all duration-150 ease-out
          hover:bg-[#A00000]
          hover:scale-[1.02]
          active:scale-95
          cursor-pointer
          mt-4 border-t border-[#C00000]/30 pt-4
        "
      >
        <span className="text-lg">🚪</span>
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
};