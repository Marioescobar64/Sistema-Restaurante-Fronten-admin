export const LoginForm = ({ onForgot }) => {
  return (
    <form className="space-y-6 bg-white/95 backdrop-blur-md p-7 rounded-2xl border border-[#C00000]/20 shadow-lg transition-all duration-300">

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#C00000]">
          Bienvenido
        </h2>
        <p className="text-sm text-[#2E7D32] mt-1">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* EMAIL / USUARIO */}
      <div>
        <label className="block text-sm font-medium text-[#2E2E2E] mb-1.5">
          Email o Usuario
        </label>
        <input
          type="text"
          placeholder="correo@ejemplo.com o usuario"
          className="w-full px-3 py-2.5 text-sm border border-[#C00000]/30 rounded-lg 
                     focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] 
                     outline-none bg-white text-[#2E2E2E] 
                     placeholder-gray-400 transition"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#2E2E2E] mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2.5 text-sm border border-[#C00000]/30 rounded-lg 
                     focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] 
                     outline-none bg-white text-[#2E2E2E] 
                     placeholder-gray-400 transition"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="w-full bg-[#C00000] text-white py-2.5 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#8B0000] 
                   transition-all duration-300 hover:scale-[1.02] shadow-md"
      >
        Iniciar Sesión
      </button>

      {/* LINK */}
      <p className="text-center text-sm text-[#2E2E2E]">
        <button
          type="button"
          onClick={onForgot}
          className="text-[#2E7D32] font-semibold hover:underline transition"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

    </form>
  );
};