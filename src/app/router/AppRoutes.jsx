import { Navigate, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { Products } from "../../features/product/components/Product";
import { MenuItems } from "../../features/menu/components/MenuItems";
import { Orders } from "../../features/order/components/Orders";
import { Reservations } from "../../features/reservation/components/Reservations";
import { Tables } from "../../features/table/components/Tables";
import { Events } from "../../features/event/components/Events";
import { Maintenance } from "../../features/maintenance/components/Maintenance";
import { Cart } from "../../features/cart/components/Cart";
import { Administration } from "../../features/administration/components/Administration";
import { Branches } from "../../features/branch/components/Branches";
import { StatisticsOverview } from "../../features/dashboard/components/StatisticsOverview";
import { canAccessRoute, normalizeRole } from "../../shared/utils/rolePermissions";

const RequireRole = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const normalizedRole = normalizeRole(role);

  if (!normalizedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children, path }) => {
  const role = localStorage.getItem("userRole") ?? "";
  if (!canAccessRoute(role, path)) {
    return <Navigate to="/dashboard/ordenes" replace />;
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
        path="/dashboard/*"
        element={
          <RequireRole>
            <DashboardPage />
          </RequireRole>
        }
      >
        <Route index element={<ProtectedRoute path="/dashboard"><StatisticsOverview /></ProtectedRoute>} />
        <Route path="estadisticas" element={<ProtectedRoute path="/dashboard/estadisticas"><StatisticsOverview /></ProtectedRoute>} />
        <Route path="productos" element={<ProtectedRoute path="/dashboard/productos"><Products /></ProtectedRoute>} />
        <Route path="platillos" element={<ProtectedRoute path="/dashboard/platillos"><MenuItems /></ProtectedRoute>} />
        <Route path="ordenes" element={<ProtectedRoute path="/dashboard/ordenes"><Orders /></ProtectedRoute>} />
        <Route path="reservaciones" element={<ProtectedRoute path="/dashboard/reservaciones"><Reservations /></ProtectedRoute>} />
        <Route path="mesas" element={<ProtectedRoute path="/dashboard/mesas"><Tables /></ProtectedRoute>} />
        <Route path="eventos" element={<ProtectedRoute path="/dashboard/eventos"><Events /></ProtectedRoute>} />
        <Route path="mantenimiento" element={<ProtectedRoute path="/dashboard/mantenimiento"><Maintenance /></ProtectedRoute>} />
        <Route path="carritos" element={<ProtectedRoute path="/dashboard/carritos"><Cart /></ProtectedRoute>} />
        <Route path="administracion" element={<ProtectedRoute path="/dashboard/administracion"><Administration /></ProtectedRoute>} />
        <Route path="sucursales" element={<ProtectedRoute path="/dashboard/sucursales"><Branches /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};