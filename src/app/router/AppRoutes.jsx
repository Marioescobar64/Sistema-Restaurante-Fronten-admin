import {Route, Routes} from "react-router-dom";
import { AuthPage } from "../../../src/features/auth/pages/AuthPage";
import { DashboardPage } from "../../../src/app/layouts/DashboardPage";

export const AppRoutes = ()=> {

return(
<Routes>
{/* PÚBLICAS */}
<Route path="/" element={<AuthPage />}/>

{/* PROTEGIDO POR ROLE */}
<Route path="/dashboard/*" element={<DashboardPage />}/>

</Routes>


);
}