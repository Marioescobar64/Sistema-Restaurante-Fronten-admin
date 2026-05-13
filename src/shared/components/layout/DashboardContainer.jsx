import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../../assets/img/fondo.png";

export const DashboardContainer = ({ children }) => {
  const defaultContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[220px] flex items-center justify-center text-center hover:scale-[1.02] transition">
          <p className="text-[#2C1506]">
            La pagina web de Papas Luigi esta diseñada para que puedas conocer facilmente todo lo que ofrecemos.
            En ella encontraras nuestro menu, informacion sobre el restaurante, opciones para realizar pedidos y una experiencia visual atractiva que refleja nuestro estilo y sabor.
            Nuestro objetivo es brindarte una navegacion sencilla y rapida, donde puedas descubrir nuestros productos, promociones y todo lo que hace especial a Papas Luigi desde cualquier dispositivo.
          </p>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[220px] flex items-center justify-center hover:scale-[1.02] transition">
          <img
            src="/src/assets/img/restaurante.png"
            alt="logo"
            className="max-h-[150px] object-contain"
          />
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[200px] flex items-center gap-6 hover:scale-[1.01] transition">
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src="/src/assets/img/logo.png"
            alt="intro"
            className="w-full h-full object-cover rounded"
          />
        </div>

        <p className="text-[#2C1506]">
          Bienvenido a Papas Luigi, el lugar donde el sabor, la creatividad y la pasion por la buena comida se unen en cada plato.
          Aqui no solo servimos papas, creamos experiencias unicas que combinan ingredientes de calidad, recetas irresistibles y un ambiente pensado para que disfrutes cada momento.
        </p>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex-1 bg-white/30 backdrop-blur-md rounded-xl p-4 border h-[80px] flex items-center justify-center">
          <p className="text-[#2C1506]">
            ¿Problemas? Contactanos: <strong>838392382</strong>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fondo})` }}
        />

        <div className="bg-[#E8D5B7]/90 backdrop-blur-md border-b border-[#A0724A]/40 z-10">
          <Navbar />
        </div>

        <div className="flex flex-1 z-10">
          <div className="bg-[#E8D5B7]/95 backdrop-blur-md border-r border-[#A0724A]/40 min-w-[220px]">
            <Sidebar />
          </div>

          <main className="flex-1 p-6 overflow-y-auto">
            {children ? children : defaultContent}
          </main>
        </div>
      </div>
    </div>
  );
};
