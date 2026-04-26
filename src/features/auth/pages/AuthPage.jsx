import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import loginfondo from "../../../assets/img/loginfondo.png";
import logo from "../../../assets/img/logo.png";

export const AuthPage = () => {
  const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "").toUpperCase();

    if (role.includes("ADMIN")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginfondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CARD */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C00000]/20 p-8 md:p-10 transition-all duration-300">
        
        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <img
            src={logo}
            alt="Logo Restaurante"
            className="h-16 w-auto drop-shadow-md"
          />
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#C00000] mb-2">
            {isForgot ? "Recuperar contraseña" : "Bienvenido"}
          </h1>

          <p className="text-[#2E7D32] text-sm max-w-xs mx-auto">
            {isForgot
              ? "Ingresa tu correo para recuperar tu acceso"
              : "Accede al panel administrativo del restaurante"}
          </p>
        </div>

        {/* FORM */}
        {isForgot ? (
          <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
        ) : (
          <LoginForm onForgot={() => setIsForgot(true)} />
        )}
      </div>
    </div>
  );
};
