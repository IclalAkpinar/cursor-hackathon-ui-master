
import { MemberHome } from "../../roles/member/MemberHome";
import { NotFound } from "../../sharedComponent/404/404";


export interface routerType {
 path: string;
 component: any;
}

export const memberRouteDatas: routerType[] = [
 {
  path: "/",
  component: <MemberHome />,
 },

];
