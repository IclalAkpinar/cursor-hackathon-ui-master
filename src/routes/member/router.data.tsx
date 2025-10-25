import { Home } from "../../roles/member/Home/Home";
import { MatchSessions } from "../../roles/member/MatchSessions/MatchSessions";
import { Appointments } from "../../roles/member/Appointments/Appointments";
import { Session } from "../../roles/member/Session/Session";
import { Profile } from "../../roles/member/Profile/Profile";
import { NotFound } from "../../sharedComponent/404/404";

export interface routerType {
 path: string;
 component: any;
}

export const memberRouteDatas: routerType[] = [
 {
  path: "/",
  component: <Home />,
 },
 {
  path: "/home",
  component: <Home />,
 },
 {
  path: "/match-sessions",
  component: <MatchSessions />,
 },
 {
  path: "/appointments",
  component: <Appointments />,
 },
 {
  path: "/profile",
  component: <Profile />,
 },
 {
  path: "/session/:id",
  component: <Session />,
 },
];
