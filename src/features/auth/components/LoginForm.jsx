import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

export const LoginForm = ({ onForgot }) => {

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res.success) {
      navigate("/dashboard");
      toast.success("Bienvenido de nuevo 🚀");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} className="space-y-6
       bg-[#E8D5B7]/95 backdrop-blur-md p-7 rounded-2xl border border-[#A0724A]/20 shadow-lg transition-all duration-300"
    >

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#4A2C0A]">
          Bienvenido
        </h2>
        <p className="text-sm text-[#4A2C0A]/70 mt-1">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {/* EMAIL / USUARIO */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Email o Usuario
        </label>
        <input
          type="text"
          placeholder="correo@ejemplo.com o usuario"
          className="w-full px-3 py-2.5 text-sm border border-[#A0724A]/40 rounded-lg 
                     focus:ring-2 focus:ring-[#A0724A]/60 focus:border-[#A0724A] 
                     outline-none bg-[#F5ECD9]/70 text-[#4A2C0A] 
                     placeholder-[#A0724A]/50 transition"
          {...register("emailOrUsername", {
            required: "Email o usuario es obligatorio"
          })}
        />
        {errors.emailOrUsername && (
          <p className="text-red-500 text-xs mt-1">
            {errors.emailOrUsername.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-[#4A2C0A] mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2.5 text-sm border border-[#A0724A]/40 rounded-lg 
                     focus:ring-2 focus:ring-[#A0724A]/60 focus:border-[#A0724A] 
                     outline-none bg-[#F5ECD9]/70 text-[#4A2C0A] 
                     placeholder-[#A0724A]/50 transition"
          {...register("password", {
            required: "Contraseña es obligatoria"
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#A0724A] text-[#F5ECD9] py-2.5 px-4 rounded-lg 
                   text-sm font-semibold hover:bg-[#7A5235] 
                   transition-all duration-300 hover:scale-[1.02] shadow-md"
      >
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </button>

      {/* LINK */}
      <p className="text-center text-sm text-[#4A2C0A]/70">
        <button
          type="button"
          onClick={onForgot}
          className="text-[#A0724A] font-semibold hover:underline transition"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

    </form>
  );
};