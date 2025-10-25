import { GetMail } from "../../roles/none/ForgotPassword/GetMail/GetMail";
import { ResetPassword } from "../../roles/none/ForgotPassword/ResetPassword/ResetPassword";
import { Login } from "../../roles/none/Login/Login";
import { VerifyMail } from "../../roles/none/VerifyMail/VerifyMail";
import { NotFound } from "../../sharedComponent/404/404";

export interface routerType {
  path: string;
  component: any;
}

export const noneRouteDatas: routerType[] = [
  {
    path: "/",
    component: <Login />,
  },

  {
    path: "/login",
    component: <Login />,
  },

  {
    path: "/getMail",
    component: <GetMail />,
  },

  {
    path: "/reset-password/:id",
    component: <ResetPassword />,
  },

  {
    path: "/verify-email/:id",
    component: <VerifyMail />,
  },

  {
    path: "/404",
    component: <NotFound />,
  },
];
