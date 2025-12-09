import { useParams, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { loadTasks, saveTasks, loadProjects } from "../../types/projectStorage";
import type { Project } from "../../types/projectStorage";

interface Task {
  id: number;
  title: string;
  description: string;
  issueDate: string;
  status: "todo" | "progress" | "completed";
  priority: "low" | "medium" | "fast";
}

export default function ProjectTask() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  // Form states
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const [status, setStatus] = useState<"todo" | "progress" | "completed">(
    "todo"
  );
  const [priority, setPriority] = useState<"low" | "medium" | "fast">("low");

  const [project, setProject] = useState<Project | null>(null);

  // Task state
  const [tasks, setTasks] = useState<Task[]>([]);

  // ...

  useEffect(() => {
    if (!id) return;
    const savedTasks = loadTasks(Number(id));
    setTasks(savedTasks);
  }, [id]);

  useEffect(() => {
    const allProjects = loadProjects();
    const current = allProjects.find((p: Project) => p.id === Number(id));
    setProject(current || null);
  }, [id]);

  const handleCreateTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      description,
      issueDate,
      status,
      priority,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(Number(id), updatedTasks); // <- yahan save ho raha hai

    setOpen(false);

    // Reset fields
    setTaskTitle("");
    setDescription("");
    setIssueDate("");
    setStatus("todo");
    setPriority("low");
  };

  return (
    <div className="p-6 w-full">
      <span
        className="font-normal text-xl text-gray-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        ⬅︎ Back to projects
      </span>
      <br />
      <br />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: project?.color }}
          >
            {project?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{project?.name}</h1>
            <p className="text-sm opacity-70">{tasks.length} tasks</p>
            <p className="text-gray-400">Manage tasks of this project</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="flex gap-6 bg-[#0f172a] border border-[#1e293b] p-6 rounded-xl hover:border-blue-600 transition">
          <div className="text-2xl mt-2 bg-gray-700 rounded-xl h-12 w-12 text-center pt-1.5">
            ◯
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 text-2xl mt-2">
              {tasks.filter((t) => t.status === "todo").length}
              <br />
              <span className="text-lg font-normal">To Do</span>
            </h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex gap-6 bg-[#0f172a] border border-[#1e293b] p-6 rounded-xl hover:border-blue-600 transition">
          <div className="text-2xl mt-2 bg-gray-700 rounded-xl h-12 w-12 text-center pt-1.5">
            🕒
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 text-2xl mt-2">
              {tasks.filter((t) => t.status === "progress").length}
              <br />
              <span className="text-lg font-normal">In Progress</span>
            </h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex gap-6 bg-[#0f172a] border border-[#1e293b] p-6 rounded-xl hover:border-blue-600 transition">
          <div className="text-2xl mt-2 bg-gray-700 rounded-xl h-12 w-12 text-center pt-1.5">
            ✔️
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 text-2xl mt-2">
              {tasks.filter((t) => t.status === "completed").length}
              <br />
              <span className="text-lg font-normal">Completed</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0f172a] text-white max-w-lg border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Task</DialogTitle>
          </DialogHeader>

          {/* Task Title */}
          <div className="mt-4">
            <label className="text-sm text-gray-300">Task Title</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              placeholder="Task name..."
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              placeholder="Task details..."
            />
          </div>

          <div className="mt-4">
            <label className="text-sm text-gray-300">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
            />
          </div>

          <div className="mt-4 flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-300">Status</label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "todo" | "progress" | "completed")
                }
                className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="text-sm text-gray-300">Priority</label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "fast")
                }
                className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
              </select>
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
              onClick={handleCreateTask}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Task
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-10 flex flex-col items-center justify-center h-[350px] mt-12">
          <h2 className="text-xl font-semibold text-gray-300">No tasks yet</h2>
          <p className="text-gray-500 mb-6">
            Create your first task to get started
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-[#0f172a] border border-gray-700 rounded-xl p-4"
            >
              <h3 className="text-xl font-semibold text-white">{t.title}</h3>
              <p className="text-gray-400 text-sm">{t.description}</p>

              <div className="flex gap-4 mt-3 text-sm">
                <p className="text-gray-300 bg-amber-900 h-6 w-24 rounded-2xl text-center opacity-55">
                  <span>🏳️ {t.priority}</span>
                </p>
                <p className="text-gray-300"> {t.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
