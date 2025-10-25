import React from "react";
import { Kapsul } from "../../../assests/icons/Kapsul";
import dark_konya_mobile from "../../../assests/landing/dark-mobile-konya.svg";
import dark_mountain_mobile from "../../../assests/landing/dark-mobile-mountain.svg";
import konya_mobile from "../../../assests/landing/mobile-konya.svg";
import mountain_mobile from "../../../assests/landing/mobile-mountain.svg";
import { UseGeneral } from "../../../store";
import { VerifyMailForm } from "./components/VerifyMailForm";

export const VerifyMail: React.FC = () => {
  const { theme } = UseGeneral();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="mx-auto w-[87vw] sm:w-[85vw] my-28">
        <div className="p-8 bg-white dark:bg-ktp_black dark:border  rounded-lg shadow-lg dark:shadow-white dark:shadow-sm max-w-lg mx-auto">
          <div className="flex justify-center mb-6 fill-ktp_black dark:fill-ktp_white">
            <Kapsul className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-medium text-center mb-4">
            Kapsül Yönetim Sistemi
          </h2>
          <h1 className="text-xl text-gray-900 dark:text-white font-semibold text-center mb-8">
            E-Posta Doğrula
          </h1>

          <h1 className="text-sm font-medium text-gray-700 dark:text-gray-200 text-start ">
            Hesabınızı doğrulamak için butona tıklayınız:
          </h1>
          <VerifyMailForm />
        </div>
      </div>
      <img
        src={theme === "light" ? mountain_mobile : dark_mountain_mobile}
        alt="Kapsül Mobile"
        className="absolute bottom-0 left-0 w-full object-cover"
        style={{ height: "50vh", zIndex: -1 }}
      />
      <img
        src={theme === "light" ? konya_mobile : dark_konya_mobile}
        alt="Kapsül Mobile"
        className="absolute bottom-0 left-0 w-full object-cover"
        style={{ height: "50vh", zIndex: -1 }}
      />
    </div>
  );
};
