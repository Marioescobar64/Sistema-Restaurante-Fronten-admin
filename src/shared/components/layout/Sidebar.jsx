import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Dashboard" },
    { label: "Platillos" },
    { label: "Órdenes" },
    { label: "Mesas" },
    { label: "Usuarios" },
    { label: "Configuración" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <aside className="w-60 bg-[#FFF8F0]/95 backdrop-blur-md border-r border-[#C00000]/20 min-h-[calc(100vh-4rem)] p-4 shadow-sm flex flex-col">

      <ul className="space-y-2 flex-1">
        {items.map((item, index) => (
          <li key={index}>
            <div
              className="
                flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-black

                transition-all duration-150 ease-out
                hover:bg-[#C00000]/10 
                hover:scale-[1.03]

                active:scale-95 active:bg-[#C00000]/20

                cursor-pointer
              "
            >

              {/* ICONO */}
              <span className="text-sm transition-transform duration-150 group-hover:scale-110">
                {getIcon(item.label)}
              </span>

              {/* LABEL */}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* BOTÓN CERRAR SESIÓN */}
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

// ICONOS
const getIcon = (label) => {
  switch (label) {
    case "Dashboard": return "🏠";
    case "Platillos": return "🍕";
    case "Órdenes": return "🧾";
    case "Mesas": return "🍽️";
    case "Usuarios": return "👤";
    case "Configuración": return "⚙️";
    default: return "•";
  }
};