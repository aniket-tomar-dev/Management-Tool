import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#0d1117] text-white p-4">
        <h1 className="text-xl font-bold mb-6">ProManage</h1>

        <nav className="flex flex-col space-y-4">
          <a href="/">Dashboard</a>
          <a href="/projects">Projects</a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
