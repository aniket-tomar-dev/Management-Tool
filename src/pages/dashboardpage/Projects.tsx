import { Folder, Plus } from "lucide-react";

export default function Projects() {
  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage and organize your projects</p>
        </div>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-10 flex flex-col items-center justify-center h-[350px]">
        <Folder size={70} className="text-gray-500 mb-4" />

        <h2 className="text-xl font-semibold text-gray-300">No projects yet</h2>

        <p className="text-gray-500 mb-6">
          Create your first project to get started
        </p>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
          <Plus size={18} /> Create Project
        </button>
      </div>
    </div>
  );
}
