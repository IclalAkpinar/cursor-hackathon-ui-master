import { Home, Clock, Users } from "lucide-react";
import { Sidebar } from "../../sharedComponent/Sidebar";

const memberNavItems = [
  {
    label: "Etkinlik Takibi",
    icon: <Home className="w-5 h-5" />,
    path: "/member/etkinlik",
  },
  {
    label: "Mesai Takibi",
    icon: <Clock className="w-5 h-5" />,
    path: "/member/mesai",
  },
];

export const MemberSidebar = () => {
  return <Sidebar items={memberNavItems} userName="Member" />;
};
