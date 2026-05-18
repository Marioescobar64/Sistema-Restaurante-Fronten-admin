export const Spinner = () => {
  return (
    /* CAMBIO RESPONSIVO: Se cambió 'h-screen' por 'min-h-screen px-4 box-border' para una correcta adaptación a pantallas móviles y barras de navegación */
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-4 box-border">

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Logo"
        /* CAMBIO RESPONSIVO: 'w-14 sm:w-16' escala el tamaño del logo de manera fluida según el dispositivo */
        className="w-14 sm:w-16 opacity-90 object-contain"
      />

      {/* SPINNER */}
      <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-4 
                      border-[#A0724A] border-t-transparent">
      </div>

      {/* TEXTO OPCIONAL */}
      <p className="text-xs sm:text-sm text-[#4A2C0A]/70">
        Cargando...
      </p>

    </div>
  );
};