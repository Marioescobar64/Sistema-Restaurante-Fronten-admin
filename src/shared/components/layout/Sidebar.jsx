export const Sidebar = () => {
  const items = [
    { label: "Dashboard" },
    { label: "Platillos" },
    { label: "Órdenes" },
    { label: "Mesas" },
    { label: "Usuarios" },
    { label: "Configuración" },
  ];

  return (
    <aside className="w-60 bg-[#E8D5B7]/95 backdrop-blur-md border-r border-[#A0724A]/40 min-h-[calc(100vh-4rem)] p-4 shadow-sm">

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <div
              className="
                flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-[#4A2C0A]

                transition-all duration-150 ease-out
                hover:bg-[#C4935A]/20 
                hover:scale-[1.03]

                active:scale-95 active:bg-[#C4935A]/30

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