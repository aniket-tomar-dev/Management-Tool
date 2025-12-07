import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashBoardLayout() {
  return (
    <div className="flex h-screen w-screen bg-[#020617] text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
