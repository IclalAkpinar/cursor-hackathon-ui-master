import { Navigate, Route, Routes } from "react-router-dom";
import { superAdminRouteDatas, routerType } from "./router.data";
import { SuperAdminLayout } from "../../layouts";

export const SuperAdminRouter = () => {
 const pageRoutes = superAdminRouteDatas.map((page: routerType) => {
  return <Route key={page.path} path={page.path} element={page.component} />;
 });
 return (
  <Routes>
   <Route path="" element={<SuperAdminLayout />} children={pageRoutes} />
   <Route path="*" element={<Navigate to={"/404"} />} />
  </Routes>
 );
};
