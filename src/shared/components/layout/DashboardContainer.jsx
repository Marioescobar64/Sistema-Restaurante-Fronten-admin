import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../../assets/img/fondo.png";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-col min-h-screen relative">

        {/* FONDO */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fondo})` }}
        />

        {/* NAVBAR */}
        <div className="bg-[#E8D5B7]/90 backdrop-blur-md border-b border-[#A0724A]/40 z-10">
          <Navbar />
        </div>

        <div className="flex flex-1 z-10">

          {/* SIDEBAR */}
          <div className="bg-[#E8D5B7]/95 backdrop-blur-md border-r border-[#A0724A]/40 min-w-[220px]">
            <Sidebar />
          </div>

          {/* MAIN */}
          <main className="flex-1 p-6 overflow-y-auto">

            <div className="space-y-6">

              {/* ===================== FILA 1 ===================== */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* TEXTO */}
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[220px] flex items-center justify-center text-center hover:scale-[1.02] transition">
                  <p className="text-[#2C1506]">
                   La página web de Papas Luigi está diseñada para que puedas conocer fácilmente todo lo que ofrecemos. En ella encontrarás nuestro menú, información sobre el restaurante, opciones para realizar pedidos y una experiencia visual atractiva que refleja nuestro estilo y sabor.
Nuestro objetivo es brindarte una navegación sencilla y rápida, donde puedas descubrir nuestros productos, promociones y todo lo que hace especial a Papas Luigi desde cualquier dispositivo.<br />
                   
                  </p>
                </div>

                {/* LOGO */}
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[220px] flex items-center justify-center hover:scale-[1.02] transition">
                  
                  {/* 🔥 AQUI VA TU LOGO */}

                  <img
                    src="/src/assets/img/restaurante.png"
                    alt="logo"
                    className="max-h-[150px] object-contain"
                  />

                  {/* 👉 SI NO TIENES IMAGEN AUN, USA ESTO:
                  <div className="w-40 h-40 bg-[#C4935A] flex items-center justify-center text-white">
                    Logo
                  </div>
                  */}

                </div>

              </div>

              {/* ===================== FILA 2 ===================== */}
              <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[200px] flex items-center gap-6 hover:scale-[1.01] transition">

                {/* IMAGEN */}
                <div className="w-32 h-32 flex items-center justify-center">
                  
                  {/* 🔥 AQUI VA TU IMAGEN */}
                  <img
                    src="/src/assets/img/logo.png"
                    alt="intro"
                    className="w-full h-full object-cover rounded"
                  />

                </div>

                {/* TEXTO */}
                <p className="text-[#2C1506]">
                  Bienvenido a Papas Luigi, el lugar donde el sabor, la
                   creatividad y la pasión por la buena comida se unen en 
                   cada plato. Aquí no solo servimos papas, creamos experiencias
                    únicas que combinan ingredientes de calidad, recetas irresistibles 
                    y un ambiente pensado para que disfrutes cada momento.

                </p>

              </div>

              

              {/* ===================== FILA 4 ===================== */}
              <div className="flex gap-4 items-center flex-wrap">

                {/* REDES */}
                <div className="flex gap-3">

                 
                </div>

                {/* CONTACTO */}
                <div className="flex-1 bg-white/30 backdrop-blur-md rounded-xl p-4 border h-[80px] flex items-center justify-center">
                  <p className="text-[#2C1506]">
                    ¿Problemas? Contáctanos: <strong>838392382</strong>
                  </p>
                </div>

              </div>

            </div>

          </main>

        </div>
      </div>
    </div>
  );
};