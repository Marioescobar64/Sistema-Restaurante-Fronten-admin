import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
 
import { login as loginRequest } from "../../../shared/api";
 
export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,
 
            checkAuth: () => {
                const token = get().token;
                const role = get().user?.rol || get().user?.role;
                const isAdmin = role === "SUPER_ADMIN_ROLE" || role === "GERENTE_ROLE" || role === "ADMIN_ROLE";
 
                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No autorizado para acceder al panel de administración"
                    })
                }
            },
 
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },
 
            login: async ({ emailOrUsername, password }) => {
                // El backend de Node espera 'email', así que lo mapeamos:
                const payload = { email: emailOrUsername, password };
                const response = await loginRequest(payload);
                
                // La respuesta de Axios tiene { data: { success, data: { user, token } } }
                const responseData = response.data?.data;
 
                // Extraemos el rol (Node usa 'rol')
                const role = responseData?.user?.rol;
                
                // Permitimos a SUPER_ADMIN_ROLE (Node)
                if (role !== "SUPER_ADMIN_ROLE" && role !== "GERENTE_ROLE") {
                    const message = "No autorizado para acceder al panel de administración";
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: message,
                    });
                    toast.error(message);
                    return { success: false, error: message };
                }
                set({
                    user: responseData.user,
                    token: responseData.token,
                    refreshToken: null,
                    expiresAt: null, // Node no devuelve expiresAt explícito en el payload actualmente
                    isAuthenticated: true,
                    error: null,
                    isLoadingAuth: false,
                });
                return { success: true }
            },
        }),
        { name: "auth-store" })
);