import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* LOGIN PRIMERO */}
      <Route path="/" element={<AuthPage />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};