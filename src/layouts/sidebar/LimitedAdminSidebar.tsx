import { Home, Clock, Users } from "lucide-react";
import { Sidebar } from "../../sharedComponent/Sidebar";

const limitedAdminNavItems = [
  {
    label: "Etkinlik Takibi",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/etkinlik",
  },
  {
    label: "Mesai Takibi",
    icon: <Clock className="w-5 h-5" />,
    path: "/admin/mesai",
  },
];

export const LimitedAdminSidebar = () => {
  return <Sidebar items={limitedAdminNavItems} userName="Limited Admin" />;
};
