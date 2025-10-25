import { Home, Clock, Users } from "lucide-react";
import { Sidebar } from "../../sharedComponent/Sidebar";

const superAdminNavItems = [
  {
    label: "Etkinlik Takibi",
    icon: <Home className="w-5 h-5" />,
    path: "/super-admin/etkinlik",
  },
  {
    label: "Mesai Takibi",
    icon: <Clock className="w-5 h-5" />,
    path: "/super-admin/mesai",
  },
  {
    label: "Kullanıcılar",
    icon: <Users className="w-5 h-5" />,
    path: "/super-admin/kullanicilar", 
  },
];

export const SuperAdminSidebar = () => {
  return <Sidebar items={superAdminNavItems} userName="Super Admin" />;
};
