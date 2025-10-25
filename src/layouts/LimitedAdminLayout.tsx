import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { Footer } from "../sharedComponent/footer";
import { LimitedAdminSidebar } from "./sidebar";

export const LimitedAdminLayout = () => {
  return (
    <>
      <Helmet>
        <body className="font-[montserrat] bg-ktp_white text-ktp_black dark:text-ktp_white duration-300 w-full m-0 overflow-x-hidden p-0 box-border" />
      </Helmet>
      <div className="flex min-h-screen w-full">
        <LimitedAdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
