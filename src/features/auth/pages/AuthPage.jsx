import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RegisterForm } from "../components/RegisterForm";
import loginfondo from "../../../assets/img/loginfondo.png";
import logo from "../../../assets/img/logo.png";
import { getDefaultDashboardPath, normalizeRole } from "../../../shared/utils/rolePermissions";

export const AuthPage = () => {
  const [currentView, setCurrentView] = useState("login"); // 'login' | 'forgot' | 'register'
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";
    const normalizedRole = normalizeRole(role);

    if (normalizedRole) {
      navigate(getDefaultDashboardPath(role), { replace: true });
    }
  }, [navigate]);

  return (
    <div
      /* CAMBIO RESPONSIVO: Se cambió 'min-h-screen' por un flujo con scroll vertical preventivo 'min-h-screen py-6 px-4' */
      className="min-h-screen flex items-center justify-center py-6 px-4 box-border overflow-y-auto"
      style={{
        backgroundImage: `url(${loginfondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CARD */}
      {/* CAMBIO RESPONSIVO: Se ajustaron los paddings fluidos 'p-5 sm:p-8 md:p-10' para evitar colapsar los elementos internos en pantallas compactas*/}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C00000]/20 p-5 sm:p-8 md:p-10 transition-all duration-300 box-border">
        
        {/* LOGO */}
        {/* CAMBIO RESPONSIVO: 'mb-4 sm:mb-5' y escala en la altura de la imagen para pantallas chicas */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <img
            src={logo}
            alt="Logo Restaurante"
            className="h-14 sm:h-16 w-auto drop-shadow-md object-contain"
          />
        </div>

        {/* HEADER */}
        {/* CAMBIO RESPONSIVO: 'mb-5 sm:mb-6' y tamaños de texto equilibrados fluidamente */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#C00000] mb-2">
            {currentView === "forgot" ? "Recuperar contraseña" : currentView === "register" ? "Crear Cuenta" : "Bienvenido"}
          </h1>

          {/* CAMBIO RESPONSIVO: 'text-xs sm:text-sm' para una lectura óptima y evitar desbordamientos de bloque */}
          <p className="text-[#2E7D32] text-xs sm:text-sm max-w-xs mx-auto">
            {currentView === "forgot"
              ? "Ingresa tu correo para recuperar tu acceso"
              : currentView === "register"
              ? "Únete y comienza a disfrutar nuestros beneficios"
              : "Accede al panel administrativo del restaurante"}
          </p>
        </div>

        {/* FORM */}
        {currentView === "forgot" ? (
          <ForgotPasswordForm onSwitch={() => setCurrentView("login")} />
        ) : currentView === "register" ? (
          <RegisterForm onSwitch={() => setCurrentView("login")} />
        ) : (
          <LoginForm onForgot={() => setCurrentView("forgot")} onRegister={() => setCurrentView("register")} />
        )}
      </div>
    </div>
  );
};