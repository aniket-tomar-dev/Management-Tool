import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon,
} from "lucide-react";

interface UserType {
  fullName?: string;
  email?: string;
}

interface SidebarProps {
  user?: UserType | null;
}

export default function Sidebar({}: SidebarProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const storedUser = localStorage.getItem("user");
  const safeUser: UserType = storedUser
    ? JSON.parse(storedUser)
    : { fullName: "User", email: "Email" };
  return (
    <aside
      className={`h-screen bg-[#020617] text-white flex flex-col justify-between border-r border-white/10 transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div>
        <div
          className={`relative flex items-center gap-3 px-4 py-5 transition-all 
          ${collapsed ? "justify-center" : ""}`}
        >
          {!collapsed && (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              M
            </div>
          )}

          {!collapsed && (
            <h1 className="text-xl font-semibold whitespace-nowrap">
              Manage Tool
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`absolute top-1/2 -translate-y-1/2 
              ${collapsed ? "right-2" : "right-3"} 
              text-xl text-gray-300 hover:text-white cursor-pointer hover:bg-cyan-400 p-1 rounded-lg`}
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        <nav className="mt-6 space-y-2 px-3">
          <NavLink
            to="/dashboard/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            <LayoutDashboard size={26} />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            <FolderKanban size={26} />
            {!collapsed && "Projects"}
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            <Settings size={26} />
            {!collapsed && "Settings"}
          </NavLink>
        </nav>
      </div>

      <div className="px-4 py-4 border-t border-white/10 space-y-4">
        {!collapsed && (
          <button className="flex items-center gap-2 text-lg">
            <Moon /> Light mode
          </button>
        )}

        {!collapsed && (
          <div className="text-sm">
            <p className="font-medium">{safeUser.fullName}</p>
            <p className="text-gray-400">{safeUser.email}</p>
          </div>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className={`flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-600 rounded-2xl h-10 transition-all
          ${collapsed ? "justify-center w-full" : "w-28 text-center px-3"}`}
        >
          <LogOut size={22} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
