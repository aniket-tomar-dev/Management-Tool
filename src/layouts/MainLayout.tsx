import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  const linkClasses = (isActive: boolean) =>
    `px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-blue-500 text-black" : "text-white hover:bg-white/10"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#020617] text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">ProManage</h1>

          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/projects"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Projects
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Settings
            </NavLink>
          </nav>
        </div>

        <div className="text-gray-400 text-sm mt-6">
          <p>Logged in as:</p>
          <p className="text-white font-medium">
            {JSON.parse(localStorage.getItem("user") || "{}").fullName ||
              "User"}
          </p>
        </div>
      </aside>

      <main className="flex-1 bg-[#0f172a] p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
