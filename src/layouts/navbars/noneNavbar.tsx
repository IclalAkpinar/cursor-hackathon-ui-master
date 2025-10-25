import { ConfigProvider } from "antd";
import { useState } from "react";
import { Logo } from "../../sharedComponent/Logo";

export const NoneNavbar = () => {
  const [navbarshow] = useState<boolean>(true);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#BA2038",
        },
      }}
    >
      <div
        className={`w-full duration-300 py-4 z-50 fixed  ${
          navbarshow ? "top-0" : "-top-24"
        } ${
          window.scrollY > 300 &&
          "bg-[#F1F4F3c9] dark:bg-black backdrop-blur-sm shadow"
        }`}
      >
        <div className="w-[90vw] md:w-[95vw] mx-auto flex justify-between items-center gap-x-4">
          <Logo className="size-[30px] fill-[#5AB6DD] hover:scale-105 duration-300" />
          <div
            className="overflow-x-auto scrollbar-hide items-center"
            style={{ marginTop: "8px" }}
          >
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
