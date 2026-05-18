import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../../assets/img/fondo.png";

export const DashboardContainer = ({ children }) => {
  const defaultContent = (
    <div className="space-y-4 sm:space-y-6">
      {/* GRID PRINCIPAL RESPONSIVO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/20 min-h-[200px] md:h-[220px] flex items-center justify-center text-center hover:scale-[1.01] sm:hover:scale-[1.02] transition duration-200">
          <p className="text-[#2C1506] text-xs sm:text-sm leading-relaxed m-0">
            La página web de Papas Luigi está diseñada para que puedas conocer fácilmente todo lo que ofrecemos.
            En ella encontrarás nuestro menú, información sobre el restaurante, opciones para realizar pedidos y una experiencia visual atractiva que refleja nuestro estilo y sabor.
            Nuestro objetivo es brindarte una navegación sencilla y rápida, donde puedas descubrir nuestros productos, promociones y todo lo que hace especial a Papas Luigi desde cualquier dispositivo.
          </p>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/20 min-h-[180px] md:h-[220px] flex items-center justify-center hover:scale-[1.01] sm:hover:scale-[1.02] transition duration-200">
          <img
            src="/src/assets/img/restaurante.png"
            alt="logo"
            className="max-h-[120px] sm:max-h-[150px] w-auto object-contain"
          />
        </div>
      </div>

      {/* BLOQUE DE BIENVENIDA ADAPTADO */}
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/20 h-auto md:h-[200px] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:scale-[1.005] sm:hover:scale-[1.01] transition duration-200 text-center sm:text-left">
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center">
          <img
            src="/src/assets/img/logo.png"
            alt="intro"
            className="w-full h-full object-cover rounded-xl shadow-sm"
          />
        </div>

        <p className="text-[#2C1506] text-xs sm:text-sm leading-relaxed m-0">
          Bienvenido a Papas Luigi, el lugar donde el sabor, la creatividad y la pasión por la buena comida se unen en cada plato.
          Aquí no solo servimos papas, creamos experiencias únicas que combinan ingredientes de calidad, recetas irresistibles y un ambiente pensado para que disfrutes cada momento.
        </p>
      </div>

      {/* FOOTER INTERNO */}
      <div className="w-full bg-white/30 backdrop-blur-md rounded-xl p-4 border border-white/20 h-[70px] sm:h-[80px] flex items-center justify-center text-center">
        <p className="text-[#2C1506] text-xs sm:text-sm m-0">
          ¿Problemas? Contáctanos: <strong className="whitespace-nowrap">838392382</strong>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <div className="flex flex-col flex-1 relative min-h-screen">
        {/* IMAGEN DE FONDO ABSOLUTA */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${fondo})` }}
        />

        {/* NAVBAR */}
        <div className="bg-[#E8D5B7]/90 backdrop-blur-md border-b border-[#A0724A]/40 z-10 flex-shrink-0">
          <Navbar />
        </div>

        {/* CUERPO PRINCIPAL: SE APILA EN MÓVILES (flex-col) Y SE DIVIDE EN ESCRITORIO (md:flex-row) */}
        <div className="flex flex-col md:flex-row flex-1 z-10 w-full relative">
          
          {/* SIDEBAR RESPONSIVO */}
          <div className="bg-[#E8D5B7]/95 backdrop-blur-md border-b md:border-b-0 md:border-r border-[#A0724A]/40 w-full md:min-w-[220px] md:w-[220px] flex-shrink-0">
            <Sidebar />
          </div>

          {/* CONTENIDO CONTENEDOR */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto box-border w-full dynamic-main-height">
            {children ? children : defaultContent}
          </main>
        </div>
      </div>
    </div>
  );
};