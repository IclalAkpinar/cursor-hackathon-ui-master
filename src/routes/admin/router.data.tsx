
import { AdminHome } from "../../roles/admin/AdminHome";
import { NotFound } from "../../sharedComponent/404/404";


export interface routerType {
 path: string;
 component: any;
}

export const adminRouteDatas: routerType[] = [
 {
  path: "/",
  component: <AdminHome />,
 },

];
