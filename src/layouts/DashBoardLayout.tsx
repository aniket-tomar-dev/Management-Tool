import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashBoardLayout() {
  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#020617] text-black dark:text-white">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#0f172a] dark:bg-[#0f172a]">
        <Outlet />
      </main>
    </div>
  );
}
