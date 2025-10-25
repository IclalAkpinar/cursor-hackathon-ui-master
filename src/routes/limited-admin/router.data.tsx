
import { LimitedAdminHome } from "../../roles/limited-admin/LimitedAdminHome";
import { NotFound } from "../../sharedComponent/404/404";

export interface routerType {
 path: string;
 component: any;
}

export const limitedAdminRouteDatas: routerType[] = [
 {
  path: "/",
  component: <LimitedAdminHome />,
 },

];
