import { useState } from "react";
import { LoginForm } from "../../../../src/features/auth/components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export const AuthPage = () => {
  const [isForgot, setIsForgot] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `
          linear-gradient(rgba(243,248,242,0.85), rgba(245,245,220,0.9)),
          url("/fondo.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* CARD */}
      <div className="w-full max-w-md bg-[#F5ECD9]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#A0724A]/20 p-8 md:p-10 transition-all duration-300">

        {/* LOGO */}
        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="Logo Restaurante"
            className="h-20 w-auto drop-shadow-md"
          />
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#4A2C0A] mb-2">
            {isForgot ? "Recuperar contraseña" : "Bienvenido"}
          </h1>

          <p className="text-[#7A5235] text-sm max-w-xs mx-auto">
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