import { Navigate, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../layouts/DashboardPage";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { Products } from "../../features/product/components/Products";
import { MenuItems } from "../../features/menu/components/MenuItems";
import { Orders } from "../../features/order/components/Orders";
import { Reservations } from "../../features/reservation/components/Reservations";
import { Tables } from "../../features/table/components/Tables";
import { Events } from "../../features/event/components/Events";
import { Maintenance } from "../../features/maintenance/components/Maintenance";
import { Cart } from "../../features/cart/components/Cart";
// import { Administration } from "../../features/administration/components/Administration";

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
        path="/dashboard/*"
        element={
          <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>
        }
      >
        <Route index element={null} />
        <Route path="productos" element={<Products />} />
        <Route path="platillos" element={<MenuItems />} />
        <Route path="ordenes" element={<Orders />} />
        <Route path="reservaciones" element={<Reservations />} />
        <Route path="mesas" element={<Tables />} />
        <Route path="eventos" element={<Events />} />
        <Route path="mantenimiento" element={<Maintenance />} />
        <Route path="carritos" element={<Cart />} />
 
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};