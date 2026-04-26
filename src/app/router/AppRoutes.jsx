import { Navigate, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

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