import { Folder, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  color: string;
}

export default function Projects() {
  const [open, setOpen] = useState(false);

  const colors = [
    "#60A5FA",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#A855F7",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = () => {
    if (!projectName.trim()) return alert("Project name required!");

    const newProject: Project = {
      id: Date.now(),
      name: projectName,
      description,
      color: selectedColor,
    };

    setProjects([...projects, newProject]);

    setProjectName("");
    setDescription("");
    setSelectedColor(colors[0]);
    setOpen(false);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage and organize your projects</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍  Search projects..."
          className="w-full px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-[#0f172a] border border-white/10 rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3  mb-4 ">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: p.color }}
                >
                  {p.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">{p.name}</h3>
                  <p className="text-sm opacity-70">{0} tasks</p>
                </div>
              </div>

              <p className="text-base opacity-75 mb-4">
                {p.description || "No description"}
              </p>
              <br />
              <p className="text-sm opacity-70 mb-1">Progress</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-10 flex flex-col items-center justify-center h-[350px]">
          <Folder size={70} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-300">
            No projects yet
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first project to get started
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Create Project
          </button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0f172a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Project</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <label className="text-sm text-gray-300">Project Name</label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              placeholder="My Awesome Project"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-300">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              placeholder="What is this project about?"
            />
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2">Color</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <div
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 transition ${
                    selectedColor === c ? "border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Project
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
