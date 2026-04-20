export const TournamentModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      {/* CONTENEDOR */}
      <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-2xl 
                      w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col 
                      overflow-hidden border border-[#A0724A]/20">

        {/* HEADER */}
        <div className="p-5 border-b border-[#A0724A]/20">
          <h2 className="text-xl font-semibold text-[#4A2C0A]">
            Nuevo torneo
          </h2>
          <p className="text-sm text-[#4A2C0A]/70">
            Completa la información
          </p>
        </div>

        {/* FORM */}
        <form className="p-5 space-y-5 overflow-y-auto">

          {/* PREVIEW */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-2xl bg-[#E8D5B7] border border-[#A0724A]/20 
                            flex items-center justify-center shadow-inner">
              <span className="text-[#4A2C0A]/50 text-xs">
                Sin imagen
              </span>
            </div>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Nombre */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Nombre del torneo
              </label>
              <input
                placeholder="Ej. Copa Primavera 2026"
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

            {/* Fecha inicio */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Fecha inicio
              </label>
              <input
                type="date"
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

            {/* Fecha fin */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Fecha fin
              </label>
              <input
                type="date"
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

            {/* Categoría */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Categoría
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              >
                <option>Seleccione</option>
                <option>Fútbol 5</option>
                <option>Fútbol 7</option>
                <option>Fútbol 11</option>
              </select>
            </div>

            {/* Imagen */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Logo del torneo
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2.5 rounded-lg border border-dashed border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 cursor-pointer 
                           hover:border-[#A0724A] transition"
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Descripción
              </label>
              <textarea
                placeholder="Detalles del torneo..."
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#A0724A]/20">

            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E8D5B7] text-[#4A2C0A] 
                         hover:bg-[#d9c4a3] transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#7F3C09] text-[#F5ECD9] 
                         font-semibold hover:bg-[#2C1506] transition shadow-md"
            >
              Crear torneo
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};