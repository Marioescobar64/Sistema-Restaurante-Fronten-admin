
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};