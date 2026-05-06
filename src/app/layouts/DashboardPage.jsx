import { useEffect } from "react";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer";
import { Outlet } from "react-router-dom";

export const DashboardPage = () => {
  useEffect(() => {
    document.title = "Panel - Restaurante";
  }, []);

  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};