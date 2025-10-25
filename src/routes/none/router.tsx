import { NoneLayout } from "../../layouts";
import { Navigate, Route, Routes } from "react-router-dom";
import { noneRouteDatas, routerType } from "./router.data";

export const NoneRouter = () => {
 const pageRoutes = noneRouteDatas.map((page: routerType) => {
  return <Route key={page.path} path={page.path} element={page.component} />;
 });
 return (
  <Routes>
   <Route path="" element={<NoneLayout />} children={pageRoutes} />
   <Route path="*" element={<Navigate to={"/404"} />} />
  </Routes>
 );
};
