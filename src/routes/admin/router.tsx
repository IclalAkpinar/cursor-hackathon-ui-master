import { AdminLayout, NoneLayout } from "../../layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRouteDatas, routerType } from "./router.data";

export const AdminRouter = () => {
 const pageRoutes = adminRouteDatas.map((page: routerType) => {
  return <Route key={page.path} path={page.path} element={page.component} />;
 });
 return (
  <Routes>
   <Route path="" element={<AdminLayout />} children={pageRoutes} />
   <Route path="*" element={<Navigate to={"/404"} />} />
  </Routes>
 );
};
