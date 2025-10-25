
import SuperAdminHome from "../../roles/super-admin/SuperAdminHome";
import { NotFound } from "../../sharedComponent/404/404";


export interface routerType {
 path: string;
 component: any;
}

export const superAdminRouteDatas: routerType[] = [
 {
  path: "/",
  component: <SuperAdminHome />,
 },

];
