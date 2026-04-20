export const FieldModal = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      {/* CONTENEDOR */}
      <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-[#A0724A]/20">

        {/* HEADER */}
        <div className="p-5 border-b border-[#A0724A]/20">
          <h2 className="text-xl font-semibold text-[#4A2C0A]">
            Nuevo campo
          </h2>
          <p className="text-sm text-[#4A2C0A]/70">
            Completa la información
          </p>
        </div>

        {/* FORM */}
        <div className="p-5 space-y-5 overflow-y-auto">

          {/* PREVIEW */}
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-2xl bg-[#E8D5B7] border border-[#A0724A]/20 flex items-center justify-center shadow-inner">
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
                Nombre
              </label>
              <input
                placeholder="Ej. Campo principal"
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 
                           transition"
              />
            </div>

            {/* Tipo */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Tipo
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              >
                <option>Seleccione</option>
                <option>Sintética</option>
                <option>Concreto</option>
                <option>Natural</option>
              </select>
            </div>

            {/* Capacidad */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Capacidad
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              >
                <option>Seleccione</option>
                <option>5 personas</option>
                <option>7 personas</option>
                <option>11 personas</option>
              </select>
            </div>

            {/* Precio */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Precio por hora
              </label>
              <input
                type="number"
                placeholder="Q100"
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Descripción
              </label>
              <textarea
                placeholder="Detalles..."
                className="w-full px-3 py-2.5 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 text-[#4A2C0A] 
                           focus:outline-none focus:ring-2 focus:ring-[#A0724A]/60 transition"
              />
            </div>

            {/* Imagen */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-[#4A2C0A] mb-1">
                Imagen
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2.5 rounded-lg border border-dashed border-[#A0724A]/40 
                           bg-[#F5ECD9]/70 cursor-pointer 
                           hover:border-[#A0724A] transition"
              />
            </div>

          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#A0724A]/20">

            <button
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E8D5B7] text-[#4A2C0A] 
                         hover:bg-[#d9c4a3] transition"
            >
              Cancelar
            </button>

            <button
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#7F3C09] text-[#F5ECD9] 
                         font-semibold hover:bg-[#2C1506] transition shadow-md"
            >
              Crear
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};