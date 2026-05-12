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
      isLoadingAuth: false,
      isAuthenticated: false,

      login: async ({ emailOrUsername, password }) => {
        try {
          const { data } = await loginRequest({
            emailOrUsername,
            password,
          });

          const role = data?.userDetails?.role;
          const isAdmin = role === "ADMIN_ROLE";

          if (!isAdmin) {
            const message =
              "No autorizado para acceder al panel de administración";

            set({
              user: null,
              token: null,
              refreshToken: null,
              expiresAt: null,
              isAuthenticated: false,
              error: message,
              isLoadingAuth: false,
            });

            toast.error(message);
            return { success: false, error: message };
          }

          set({
            user: data.userDetails,
            token: data.accessToken || data.token,
            refreshToken: data.refreshToken,
            expiresAt: data.expiresIn || data.expiresAt,
            isAuthenticated: true,
            error: null,
            isLoadingAuth: false,
          });

          return { success: true };
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Error al iniciar sesión";

          set({
            error: message,
            isAuthenticated: false,
            isLoadingAuth: false,
          });

          toast.error(message);
          return { success: false, error: message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },

      checkAuth: () => {
        const token = get().token;
        const role = get().user?.role;

        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        const isAdmin = role === "ADMIN_ROLE";

        if (!isAdmin) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            error:
              "No autorizado para acceder al panel de administración",
          });
        }
      },
    }),
    {
      name: "auth-store",
    }
  )
);