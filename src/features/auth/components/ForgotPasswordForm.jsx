export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        /* CAMBIO RESPONSIVO: Se añadió 'w-full max-w-sm mx-auto' para asegurar que mantenga su forma estética en cualquier pantalla */
        <form className="space-y-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#C00000]/20 w-full max-w-sm mx-auto box-border">
            
            {/* TÍTULO */}
            <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-[#C00000]">
                    Recuperar contraseña
                </h2>
                {/* CAMBIO RESPONSIVO: text-xs en celular para que no haga saltos de línea raros, sm:text-sm en pantallas normales */}
                <p className="text-xs sm:text-sm text-[#2E7D32] mt-1">
                    Ingresa tu correo para recibir instrucciones
                </p>
            </div>

            {/* INPUT */}
            <div>
                <label className="block text-sm font-medium text-black mb-1.5">
                    Correo electrónico
                </label>
                {/* CAMBIO RESPONSIVO: Se ajustó a text-[15px] en móviles para evitar el zoom automático forzado de iOS */}
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2.5 text-[15px] sm:text-sm border border-[#C00000]/30 rounded-lg 
                    bg-white focus:ring-2 focus:ring-[#2E7D32] focus:outline-none transition text-black placeholder-gray-400"
                />
            </div>

            {/* BOTÓN */}
            <button
                type="submit"
                className="w-full bg-[#C00000] text-white py-2.5 px-4 rounded-lg text-sm font-semibold 
                hover:bg-[#8B0000] transition shadow-md"
            >
                Enviar correo
            </button>

            {/* SWITCH */}
            {/* CAMBIO RESPONSIVO: text-xs en móviles para garantizar que el botón y la pregunta queden en la misma línea */}
            <p className="text-center text-xs sm:text-sm text-black">
                ¿Recordaste tu contraseña?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-[#2E7D32] font-semibold hover:underline whitespace-nowrap"
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};