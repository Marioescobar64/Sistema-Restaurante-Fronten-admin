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
                    Una breve explicación <br />
                    De nuestra página web
                  </p>
                </div>

                {/* LOGO */}
                <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[220px] flex items-center justify-center hover:scale-[1.02] transition">
                  
                  {/* 🔥 AQUI VA TU LOGO */}

                  <img
                    src="/src/assets/img/logo.png"
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
                    src="" // 👉 PON AQUI TU IMAGEN
                    alt="intro"
                    className="w-full h-full object-cover rounded"
                  />

                </div>

                {/* TEXTO */}
                <p className="text-[#2C1506]">
                  Una introducción a nuestro proyecto o nuestra empresa
                </p>

              </div>

              {/* ===================== FILA 3 ===================== */}
              <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border h-[180px] flex items-center justify-center text-center hover:scale-[1.01] transition">
                <p className="text-[#2C1506]">
                  Ingresar datos en un pequeño formulario para que el administrador agregue
                  nombre, apellido, correo, contraseña y demás.
                </p>
              </div>

              {/* ===================== FILA 4 ===================== */}
              <div className="flex gap-4 items-center flex-wrap">

                {/* REDES */}
                <div className="flex gap-3">

                  {/* 🔥 TIKTOK */}
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img src="" alt="tiktok" className="w-full h-full object-contain" />
                  </div>

                  {/* 🔥 FACEBOOK */}
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img src="" alt="facebook" className="w-full h-full object-contain" />
                  </div>

                  {/* 🔥 INSTAGRAM */}
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img src="" alt="instagram" className="w-full h-full object-contain" />
                  </div>

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