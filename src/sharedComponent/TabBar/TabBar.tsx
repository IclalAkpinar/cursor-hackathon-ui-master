import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, CalendarOutlined } from "@ant-design/icons";

interface TabItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const tabs: TabItem[] = [
  { path: "/home", icon: <HomeOutlined />, label: "Ana Sayfa" },
  { path: "/appointments", icon: <CalendarOutlined />, label: "Randevularım" },
];

export const TabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-ktp_gray border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-ktp_delft_blue dark:text-ktp_blue_green"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

