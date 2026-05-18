export const ResetPasswordForm = ({ onBack }) => {
  return (
    <form 
      /* CAMBIO RESPONSIVO: Se agregó 'w-full max-w-sm mx-auto box-border' y se flexibilizó el padding 'p-6 sm:p-7' */
      className="space-y-6 bg-[#E8D5B7]/95 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#A0724A]/20 shadow-lg transition-all duration-300 w-full max-w-sm mx-auto box-border"
    >

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#4A2C0A]">
          Nueva contraseña
        </h2>
        <p className="text-xs sm:text-sm text-[#4A2C0A]/70 mt-1">
          Ingresa y confirma tu nueva contraseña
        </p>
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Nueva contraseña
        </label>

        {/* CAMBIO RESPONSIVO: text-[15px] en móviles para evitar zooms automáticos forzados */}
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2.5 text-[15px] sm:text-sm border border-[#A0724A]/40 rounded-lg 
                     focus:ring-2 focus:ring-[#A0724A]/60 focus:border-[#A0724A] 
                     outline-none bg-[#F5ECD9]/70 text-[#4A2C0A] 
                     placeholder-[#A0724A]/50 transition"
        />

        <p className="text-[#440F0F] text-xs mt-1">
          La contraseña es obligatoria
        </p>
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Confirmar contraseña
        </label>

        {/* CAMBIO RESPONSIVO: text-[15px] en móviles para evitar zooms automáticos forzados */}
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2.5 text-[15px] sm:text-sm border border-[#A0724A]/40 rounded-lg 
                     focus:ring-2 focus:ring-[#A0724A]/60 focus:border-[#A0724A] 
                     outline-none bg-[#F5ECD9]/70 text-[#4A2C0A] 
                     placeholder-[#A0724A]/50 transition"
        />

        <p className="text-[#440F0F] text-xs mt-1">
          Las contraseñas no coinciden
        </p>
      </div>

      {/* ERROR BACKEND */}
      <p className="text-[#440F0F] text-sm text-center font-medium">
        Error al actualizar la contraseña
      </p>

      {/* BOTÓN */}
      <button
        type="submit"
        /* CAMBIO RESPONSIVO: Desactivado el hover:scale en pantallas táctiles pequeñas para un comportamiento natural */
        className="w-full bg-[#A0724A] text-[#F5ECD9] py-2.5 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#7A5235] 
                   transition-all duration-300 sm:hover:scale-[1.02] shadow-md"
      >
        Actualizar contraseña
      </button>

      {/* VOLVER */}
      <p className="text-center text-xs sm:text-sm text-[#4A2C0A]/70">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-[#A0724A] font-semibold hover:underline transition whitespace-nowrap"
        >
          Iniciar sesión
        </button>
      </p>

    </form>
  );
};