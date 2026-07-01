import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const RegisterForm = ({ onSwitch }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
            toast.error("Por favor completa todos los campos.");
            return;
        }

        setLoading(true);

        try {
            const authUrl = import.meta.env.VITE_AUTH_API_URL
                ? import.meta.env.VITE_AUTH_API_URL.replace('/login', '/register')
                : "http://localhost:5277/api/v1/auth/register";

            // Agregamos default values para username y surname para cumplir temporalmente con el DTO actual, 
            // aunque idealmente el RegisterDto del backend debería ajustarse para no requerirlos.
            const response = await axios.post(authUrl, {
                nombre: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password: password.trim(),
                username: email.trim(),
                surname: "Cliente",
            });

            if (response.data?.success) {
                toast.success("Registro exitoso. Ya puedes iniciar sesión.");
                onSwitch(); // Volver al login
            } else {
                toast.error(response.data?.message || "Error al registrarse.");
            }
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Error al registrarse.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 bg-white/95 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-[#C00000]/20 shadow-lg transition-all duration-300 w-full max-w-[92vw] sm:max-w-md mx-auto box-border">

            {/* NAME */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1">
                    Nombre
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan"
                    className="w-full px-3 py-2 text-sm border border-[#C00000]/30 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] outline-none bg-white text-[#2E2E2E] placeholder-gray-400 transition"
                />
            </div>

            {/* EMAIL */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 text-sm border border-[#C00000]/30 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] outline-none bg-white text-[#2E2E2E] placeholder-gray-400 transition"
                />
            </div>

            {/* PHONE */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1">
                    Teléfono
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="12345678"
                    className="w-full px-3 py-2 text-sm border border-[#C00000]/30 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] outline-none bg-white text-[#2E2E2E] placeholder-gray-400 transition"
                />
            </div>

            {/* PASSWORD */}
            <div>
                <label className="block text-xs sm:text-sm font-medium text-[#2E2E2E] mb-1">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-[#C00000]/30 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#C00000] outline-none bg-white text-[#2E2E2E] placeholder-gray-400 transition"
                />
            </div>

            {/* BOTÓN */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C00000] text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-[#8B0000] active:scale-[0.98] transition-all duration-300 shadow-md disabled:cursor-not-allowed disabled:opacity-70 mt-2"
            >
                {loading ? "Registrando..." : "Crear Cuenta"}
            </button>

            {/* SWITCH */}
            <p className="text-center text-xs sm:text-sm text-black m-0 mt-4">
                ¿Ya tienes una cuenta?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-[#2E7D32] font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};
