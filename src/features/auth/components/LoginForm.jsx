import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore.js";

export const LoginForm = ({ onForgot }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    const result = await login({
      emailOrUsername: emailOrUsername.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (result.success) {
      toast.success("Bienvenido administrador. Redirigiendo...");
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/95 backdrop-blur-md p-7 rounded-2xl border border-[#C00000]/20 shadow-lg transition-all duration-300"
    >
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#C00000]">Bienvenido</h2>
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
          value={emailOrUsername}
          onChange={(event) => setEmailOrUsername(event.target.value)}
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        disabled={loading}
        className="w-full bg-[#C00000] text-white py-2.5 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#8B0000] 
                   transition-all duration-300 hover:scale-[1.02] shadow-md disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
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