import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

interface DashBoardLayoutProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function DashBoardLayout({
  darkMode,
  setDarkMode,
}: DashBoardLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#020617] text-black dark:text-white">
      {/* 1️⃣ Sidebar me props pass */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
