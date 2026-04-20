export const ForgotPasswordForm = ({ onSwitch }) => {
  return (
    <form className="space-y-6 bg-[#E8D5B7]/95 backdrop-blur-md p-7 rounded-2xl border border-[#A0724A]/20 shadow-lg transition-all duration-300">

      {/* TÍTULO */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[#4A2C0A]">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-[#4A2C0A]/70 mt-1">
          Ingresa tu correo para enviarte instrucciones
        </p>
      </div>

      {/* INPUT */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Email
        </label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2.5 text-sm border border-[#A0724A]/40 rounded-lg 
                     focus:ring-2 focus:ring-[#A0724A]/60 focus:border-[#A0724A] 
                     outline-none bg-[#F5ECD9]/70 text-[#4A2C0A] 
                     placeholder-[#A0724A]/50 transition"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="w-full bg-[#A0724A] text-[#F5ECD9] py-2.5 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#7A5235] 
                   transition-all duration-300 hover:scale-[1.02] shadow-md"
      >
        Enviar correo
      </button>

      {/* FOOTER */}
      <p className="text-center text-sm text-[#4A2C0A]/70">
        ¿Recordaste tu contraseña?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#A0724A] font-semibold hover:underline transition"
        >
          Iniciar sesión
        </button>
      </p>

    </form>
  );
};