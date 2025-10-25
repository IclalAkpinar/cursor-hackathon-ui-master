import { Menu, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useLogout } from "./LogoutButton"; 


export type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

interface SidebarProps {
  items: SidebarItem[];
  userName?: string;
}

export const Sidebar = ({ items, userName = "Kullanıcı" }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();



  return (
    <>
      <div className="md:hidden p-4 bg-[#f6f6f6] border-b border-gray-200">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <aside
  className={clsx(
    "h-screen w-64",
    "bg-[#f6f6f6] border-r border-gray-200",
    "flex flex-col transition-transform z-50",
    isOpen ? "translate-x-0" : "-translate-x-full",
    "md:translate-x-0 md:relative md:block"
  )}
>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Kapsül Yönetim Sistemi</h1>
        </div>

        <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 rounded text-sm transition-colors",
                location.pathname.startsWith(item.path)
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5" />
            <span>{userName}</span>
          </div>
          <button
  onClick={logout}
  className="text-red-500 hover:underline flex items-center gap-1"
>
  <LogOut className="w-4 h-4" />
  Çıkış
</button>

        </div>
      </aside>
    </>
  );
};
