import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GetMailForm } from "./components/GetMailForm";

export const GetMail: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-4">
        <div className="p-8 bg-white dark:bg-ktp_black rounded-lg shadow-lg">
          <LeftOutlined
            onClick={handleGoBack}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-400 cursor-pointer mb-5 text-lg"
          />
          <h1 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Şifremi Unuttum
          </h1>
          <GetMailForm />
        </div>
      </div>
    </div>
  );
};
