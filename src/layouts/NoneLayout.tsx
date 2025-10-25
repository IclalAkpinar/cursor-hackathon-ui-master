import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { NoneNavbar } from "./navbars";
import { Footer } from "../sharedComponent/footer";

export const NoneLayout = () => {

  return (
    <>
      <Helmet>
        <body className="min-h-screen font-[montserrat] bg-ktp_white text-ktp_black dark:text-ktp_white duration-300 w-full m-0 overflow-x-hidden p-0  box-border" />
      </Helmet>
      <NoneNavbar />
      <Outlet />
      <Footer />
    </>
  );
};
