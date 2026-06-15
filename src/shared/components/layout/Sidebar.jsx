import { useNavigate, useLocation } from "react-router-dom";
import { getVisibleMenuItems } from "../../../shared/utils/rolePermissions";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("userRole") ?? "";
  const items = getVisibleMenuItems(role);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* 📱 ESTILO ADICIONAL PARA OCULTAR LA BARRA DE SCROLL EN MÓVILES */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 💻 CONTENEDOR PARA ESCRITORIO (SE DETECTA CON md:flex) */}
      <aside className="hidden md:flex md:w-60 bg-[#FFF8F0]/95 backdrop-blur-md border-r border-[#C00000]/20 min-h-[calc(100vh-4rem)] p-4 shadow-sm flex-col justify-between box-border">
        <ul className="space-y-2 flex-1 m-0 p-0 list-none">
          {items.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-black
                  transition-all duration-150 ease-out cursor-pointer box-border
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

        {/* Botón Cerrar Sesión Escritorio */}
        <button
          onClick={handleLogout}
          className="
            flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-medium text-white
            bg-[#C00000] transition-all duration-150 ease-out w-full box-border
            hover:bg-[#A00000] hover:scale-[1.02] active:scale-95 cursor-pointer mt-4 text-center
          "
        >
          <span className="text-lg">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* 📱 NAVEGACIÓN MÓVIL (HORIZONTAL SCROLLABLE - SE ACTIVA EN PANTALLAS CHICAS) */}
      <nav className="block md:hidden w-full bg-[#FFF8F0]/95 backdrop-blur-md border-b border-[#C00000]/20 shadow-sm overflow-x-auto no-scrollbar sticky top-16 z-40">
        <div className="flex items-center gap-2 p-2.5 whitespace-nowrap min-w-max">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs text-black
                transition-all duration-150 ease-out border box-border
                active:scale-95 bg-white/50
                ${isActive(item.path) 
                  ? "bg-[#C00000]/15 border-[#C00000] text-[#C00000] font-bold" 
                  : "border-gray-200"
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Botón rápido de cierre de sesión en móviles */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs text-white bg-red-600 border border-red-700 active:scale-95"
          >
            <span>🚪</span>
            <span>Salir</span>
          </button>
        </div>
      </nav>
    </>
  );
};