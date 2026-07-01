import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getDefaultDashboardPath, normalizeRole } from "../../../shared/utils/rolePermissions";

export const LoginForm = ({ onForgot, onRegister }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const authUrl = import.meta.env.VITE_AUTH_API_URL ?? "http://localhost:5277/api/v1/auth/login";
      const response = await axios.post(authUrl, {
        emailOrUsername: emailOrUsername.trim(),
        password: password.trim(),
      });

      const data = response.data;
      const role = data?.userDetails?.role ?? "";
      const normalizedRole = normalizeRole(role);

      if (!data?.success) {
        toast.error(data?.message || "Inicio de sesión falló.");
        return;
      }

      if (!normalizedRole) {
        toast.error("Rol no autorizado para acceder al dashboard.");
        return;
      }

      localStorage.setItem("authToken", data.token ?? "");
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", data?.userDetails?.username ?? "Usuario");

      const dashboardPath = getDefaultDashboardPath(role);
      toast.success(`Bienvenido ${normalizedRole}. Redirigiendo al dashboard...`);
      navigate(dashboardPath, { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Error al iniciar sesión.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 sm:space-y-6 bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-[#C00000]/20 shadow-lg transition-all duration-300 w-full max-w-[92vw] sm:max-w-md mx-auto box-border"
    >

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-[#C00000]">Bienvenido</h2>
        <p className="text-xs sm:text-sm text-[#2E7D32] mt-1 break-words">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* EMAIL / USUARIO */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1.5">
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
                     placeholder-gray-400 transition box-border appearance-none text-[16px] sm:text-sm"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1.5">
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
                     placeholder-gray-400 transition box-border appearance-none text-[16px] sm:text-sm"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C00000] text-white py-2.5 sm:py-3 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#8B0000] active:scale-[0.98]
                   transition-all duration-300 shadow-md disabled:cursor-not-allowed disabled:opacity-70 box-border"
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
      </button>

      {/* LINKS */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-[#2E2E2E] m-0 mt-4">
        <button
          type="button"
          onClick={onForgot}
          className="text-[#2E7D32] font-semibold hover:underline transition cursor-pointer bg-transparent border-0 p-0"
        >
          ¿Olvidaste tu contraseña?
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="text-[#C00000] font-semibold hover:underline transition cursor-pointer bg-transparent border-0 p-0"
        >
          Regístrate
        </button>
      </div>

    </form>
  );
};