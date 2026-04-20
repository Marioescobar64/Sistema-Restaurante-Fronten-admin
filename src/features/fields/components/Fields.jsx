export const Fields = () => {
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#4A2C0A]">
            Gestión de Canchas
          </h1>
          <p className="text-[#4A2C0A]/70 text-sm mt-1">
            Administra las canchas registradas
          </p>
        </div>

        <button className="bg-[#7F3C09] px-5 py-2.5 rounded-lg text-[#F5ECD9] font-semibold 
                           hover:bg-[#2C1506] transition shadow-md">
          + Agregar Campo
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CARD */}
        <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-lg 
                        hover:shadow-2xl transition-all duration-300 overflow-hidden 
                        border border-[#A0724A]/20 hover:scale-[1.02]">

          {/* IMAGEN */}
          <div className="w-full h-48 bg-[#E8D5B7] flex items-center justify-center">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Campo"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* CONTENIDO */}
          <div className="p-5">

            <h2 className="text-lg font-semibold text-[#4A2C0A]">
              Nombre del Campo
            </h2>

            {/* BADGES */}
            <div className="flex gap-2 mt-2 flex-wrap">

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#E8D5B7] text-[#4A2C0A] font-medium border border-[#A0724A]/30">
                5 vs 5
              </span>

              <span className="px-3 py-1 text-xs rounded-full 
                               bg-[#7F3C09] text-[#F5ECD9] font-medium">
                Q100/hora
              </span>

            </div>

            {/* INFO */}
            <p className="text-sm text-[#4A2C0A]/50 mt-2">
              ID: 123456
            </p>

            {/* BOTONES */}
            <div className="flex gap-3 mt-5">

              <button className="flex-1 py-2 rounded-lg bg-[#A0724A] text-[#F5ECD9] 
                                 font-medium hover:bg-[#7A5235] transition">
                ✏️ Editar
              </button>

              <button className="flex-1 py-2 rounded-lg bg-[#440F0F] text-[#F5ECD9] 
                                 font-medium hover:opacity-90 transition">
                🗑️ Eliminar
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};