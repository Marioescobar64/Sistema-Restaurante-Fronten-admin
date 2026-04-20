import { Spinner } from "../../auth/components/Spinner.jsx";

export const Reservations = () => {
  const loading = false;

  if (loading) return <Spinner />;

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#4A2C0A]">
          Gestión de Reservaciones
        </h1>
        <p className="text-[#4A2C0A]/70 text-sm mt-1">
          Administra y confirma las reservaciones
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD PENDIENTE */}
        <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-lg 
                        hover:shadow-2xl transition-all duration-300 
                        border border-[#A0724A]/20 hover:scale-[1.02]">

          <div className="p-5">

            <h2 className="text-lg font-semibold text-[#4A2C0A]">
              Cancha Central
            </h2>

            <p className="text-sm text-[#4A2C0A]/50">
              Usuario: usuario123
            </p>

            {/* BADGES */}
            <div className="flex gap-2 mt-3 flex-wrap">

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                12/04/2026
              </span>

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                10:00 - 11:00
              </span>

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#7F3C09] text-[#F5ECD9] font-medium">
                Pendiente
              </span>

            </div>

            {/* ACTION */}
            <div className="mt-5">
              <button className="w-full py-2 rounded-lg bg-[#A0724A] text-[#F5ECD9] 
                                 font-medium hover:bg-[#7A5235] transition">
                ✔ Confirmar
              </button>
            </div>

          </div>
        </div>

        {/* CARD CONFIRMADA */}
        <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-md 
                        border border-[#A0724A]/20">

          <div className="p-5">

            <h2 className="text-lg font-semibold text-[#4A2C0A]">
              Cancha Norte
            </h2>

            <p className="text-sm text-[#4A2C0A]/50">
              Usuario: usuario456
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                13/04/2026
              </span>

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#E8D5B7] text-[#4A2C0A] border border-[#A0724A]/30">
                15:00 - 16:00
              </span>

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#2C1506] text-[#F5ECD9] font-medium">
                Confirmada
              </span>

            </div>

            <div className="mt-5">
              <button className="w-full py-2 rounded-lg bg-[#E8D5B7] text-[#4A2C0A] 
                                 font-medium cursor-not-allowed">
                ✔ Confirmada
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* EMPTY STATE */}
      <div className="text-center text-[#4A2C0A]/50 mt-10 text-sm">
        No hay reservaciones registradas
      </div>

    </div>
  );
};