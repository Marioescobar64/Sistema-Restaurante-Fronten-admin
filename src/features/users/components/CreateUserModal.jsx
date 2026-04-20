export const CreateStaffModal = ({ isOpen }) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">

      <div className="bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-2xl 
                      w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden 
                      border border-[#A0724A]/20">

        {/* HEADER */}
        <div
          className="p-5 text-[#F5ECD9]"
          style={{
            background: "linear-gradient(90deg, #7F3C09 0%, #2C1506 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold">
            Nuevo Empleado
          </h2>
          <p className="text-sm opacity-80">
            Registra un nuevo miembro del personal
          </p>
        </div>

        {/* FORM */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">

          {/* Nombre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Apellido
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

          </div>

          {/* Usuario / Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                         bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-[#A0724A]/40 
                           bg-[#F5ECD9] focus:ring-2 focus:ring-[#A0724A]/60 outline-none"
              />
            </div>

          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
              Foto de perfil
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 rounded-lg border border-dashed border-[#A0724A]/40 
                         bg-[#F5ECD9] cursor-pointer"
            />
          </div>

          {/* BOTONES */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-[#A0724A]/20">

            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 rounded-lg 
                         bg-[#E8D5B7] text-[#4A2C0A] hover:opacity-80 transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2 rounded-lg 
                         bg-[#7F3C09] text-[#F5ECD9] font-medium 
                         hover:bg-[#2C1506] transition shadow"
            >
              Crear empleado
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};