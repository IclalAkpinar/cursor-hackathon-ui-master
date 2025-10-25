import { Home, Clock, Users } from "lucide-react";
import { Sidebar } from "../../sharedComponent/Sidebar";

const adminNavItems = [
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

export const AdminSidebar = () => {
  return <Sidebar items={adminNavItems} userName="Admin" />;
};
