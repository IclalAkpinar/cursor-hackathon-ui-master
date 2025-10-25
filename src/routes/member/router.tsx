import { AdminLayout, NoneLayout } from "../../layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { memberRouteDatas, routerType } from "./router.data";

export const MemberRouter = () => {
 const pageRoutes = memberRouteDatas.map((page: routerType) => {
  return <Route key={page.path} path={page.path} element={page.component} />;
 });
 return (
  <Routes>
   <Route path="" element={<AdminLayout />} children={pageRoutes} />
   <Route path="*" element={<Navigate to={"/404"} />} />
  </Routes>
 );
};
