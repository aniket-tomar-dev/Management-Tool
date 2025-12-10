import { useNavigate, NavLink } from "react-router-dom";

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="w-64 h-screen bg-[#020617] text-white flex flex-col justify-between border-r border-white/10">
      <div>
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            P
          </div>
          <h1 className="text-xl font-semibold">Manage Tool</h1>
        </div>

        <nav className="mt-6 space-y-2 px-3">
          <NavLink
            to="/dashboard/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              }`
            }
          >
            ⬛ DashBoard
          </NavLink>

          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              }`
            }
          >
            📙 Projects
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-black"
                  : "text-white hover:bg-white/5"
              }`
            }
          >
            ⚙️ Settings
          </NavLink>
        </nav>
      </div>

      <div className="px-5 py-4 border-t border-white/10 space-y-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 text-lg"
        >
          {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
        </button>

        <div className="text-sm">
          <p className="font-medium">{user.fullName || "User"}</p>
          <p className="text-gray-400">{user.email || "Email"}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="flex items-center gap-2 text-white-400 text-lg cursor-pointer text-center hover:bg-gray-600 rounded-2xl w-28 h-10"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
