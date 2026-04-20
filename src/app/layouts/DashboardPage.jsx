import { useEffect } from "react";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer";
export const DashboardPage = () => {

  useEffect(() => {
    document.title = "Panel - Restaurante";
  }, []);

  return <DashboardContainer />;
};