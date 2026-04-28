import { Navigate, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole") ?? "";

  // Sin token = no autenticado
  if (!token) return <Navigate to="/" replace />;

  // Con token pero sin rol admin
  const isAdmin = role.toUpperCase().includes("ADMIN");
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* LOGIN PRIMERO */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>
        }
      />
    </Routes>
  );
};