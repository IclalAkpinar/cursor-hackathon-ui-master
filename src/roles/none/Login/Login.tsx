import React from "react";
import { LoginForm } from "./components";

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-4">
        <div className="p-8 bg-white dark:bg-ktp_black rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
            Giriş Yap
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
