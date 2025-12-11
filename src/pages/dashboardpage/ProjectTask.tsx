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

// ======= TypeScript types  & data =====================

interface Task {
  id: number;
  title: string;
  description: string;
  issueDate: string;
  status: "todo" | "progress" | "completed";
  priority: "low" | "medium" | "fast";
}

type Status = "all" | "todo" | "progress" | "completed";
type Priority = "all" | "low" | "medium" | "fast";

//===================== Call Main function or Components ===============================

export default function ProjectTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [status, setStatus] = useState<"todo" | "progress" | "completed">(
    "todo"
  );
  const [priority, setPriority] = useState<"low" | "medium" | "fast">("low");

  const [filterStatus, setFilterStatus] = useState<Status>("all");
  const [filterPriority, setFilterPriority] = useState<Priority>("all");

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  //================= call useEfeect And functions ========================

  useEffect(() => {
    if (!id) return;
    const savedTasks = loadTasks(Number(id));
    setTasks(savedTasks);
    const allProjects = loadProjects();
    const current = allProjects.find((p) => p.id === Number(id));
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

    let updatedTasks: Task[];
    if (editingTaskId) {
      updatedTasks = tasks.map((t) => (t.id === editingTaskId ? newTask : t));
      setEditingTaskId(null);
    } else {
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    if (id) saveTasks(Number(id), updatedTasks);
    setOpen(false);

    setTaskTitle("");
    setDescription("");
    setIssueDate("");
    setStatus("todo");
    setPriority("low");
  };

  const toggleStatus = (taskId: number) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        let nextStatus: "todo" | "progress" | "completed";
        if (t.status === "todo") nextStatus = "progress";
        else if (t.status === "progress") nextStatus = "completed";
        else nextStatus = "todo";
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTasks(updatedTasks);
    if (id) saveTasks(Number(id), updatedTasks);
  };

  const updateStatus = (
    taskId: number,
    newStatus: "todo" | "progress" | "completed"
  ) => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    if (id) saveTasks(Number(id), updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    if (id) saveTasks(Number(id), updatedTasks);
  };

  const editTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    setTaskTitle(task.title);
    setDescription(task.description);
    setIssueDate(task.issueDate);
    setStatus(task.status);
    setPriority(task.priority);
    setEditingTaskId(task.id);
    setOpen(true);
  };

  const filteredTasks = tasks.filter((t) => {
    const statusMatch = filterStatus === "all" || t.status === filterStatus;
    const priorityMatch =
      filterPriority === "all" || t.priority === filterPriority;
    const searchMatch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  const getStatusIcon = (status: string) => {
    if (status === "todo") return "⚪";
    if (status === "progress") return "⏳";
    return "✔️";
  };

  //=============== return the webpage and show the project task page

  return (
    <div className="p-4 sm:p-6 w-full">
      <span
        className="font-normal text-lg sm:text-xl text-gray-600 cursor-pointer"
        onClick={() => navigate("/dashboard/projects")}
      >
        ⬅︎ Back to projects
      </span>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 mt-4 gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-lg sm:text-xl font-bold"
            style={{ backgroundColor: project?.color }}
          >
            {project?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {project?.name}
            </h1>
            <p className="text-sm opacity-70">{tasks.length} tasks</p>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage tasks of this project
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>
      {/*here show the three cards where we can see task status*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {["todo", "progress", "completed"].map((s) => (
          <div
            key={s}
            className="flex gap-4 sm:gap-6 bg-[#0f172a] border border-[#1e293b] p-4 sm:p-6 rounded-xl hover:border-blue-600 transition"
          >
            <div className="text-xl sm:text-2xl bg-gray-700 rounded-xl h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
              {s === "todo" ? "◯" : s === "progress" ? "🕒" : "✔️"}
            </div>

            <div>
              <h2 className="font-semibold text-white text-xl sm:text-2xl">
                {tasks.filter((t) => t.status === s).length}
              </h2>
              <span className="text-sm sm:text-lg font-normal block mt-1">
                {s === "todo"
                  ? "To Do"
                  : s === "progress"
                  ? "In Progress"
                  : "Completed"}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/*here search and filters functinality */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[30%] px-4 py-2 bg-[#1e293b] text-gray-300 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Status)}
          className="w-full sm:w-[20%] p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as Priority)}
          className="w-full sm:w-[20%] p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>
      {/* there we can see dialog box content*/}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0f172a] text-white w-[90%] sm:max-w-lg border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingTaskId ? "Edit Task" : "Create Task"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-gray-300">Task Title</label>
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
                placeholder="Task name..."
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
                placeholder="Task details..."
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Issue Date</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="text-sm text-gray-300">Status</label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as "todo" | "progress" | "completed"
                    )
                  }
                  className="w-full mt-1 p-2 rounded bg-[#1e293b] border border-gray-600 text-gray-200"
                >
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="w-full sm:w-1/2">
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
              {editingTaskId ? "Update Task" : "Create Task"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* there we see task lists */}
      {filteredTasks.length === 0 ? (
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-10 flex flex-col items-center justify-center h-[250px] sm:h-[350px] mt-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300">
            No tasks found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredTasks.map((t) => (
            <div key={t.id} className="relative group transition">
              <div
                className="bg-[#0f172a] border border-gray-700 rounded-xl p-4 flex justify-between items-start hover:border-blue-600 cursor-pointer"
                onClick={() => toggleStatus(t.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getStatusIcon(t.status)}</span>

                    <h3
                      className={`text-lg sm:text-xl font-semibold ${
                        t.status === "completed"
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {t.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm mt-1">{t.description}</p>

                  <div className="flex gap-3 sm:gap-4 mt-3 text-sm">
                    <p className="text-gray-300  bg-blue-900 px-3 py-1 rounded-2xl opacity-55">
                      🏳️ {t.priority}
                    </p>
                    <p className="text-gray-300">{t.issueDate}</p>
                  </div>
                </div>

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === t.id ? null : t.id);
                    }}
                    className={`p-2 rounded-xl cursor-pointer transition ${
                      openMenu === t.id
                        ? "bg-gray-700"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    ⋮
                  </button>

                  {openMenu === t.id && (
                    <div
                      className="absolute right-0 mt-2 w-36 sm:w-40 bg-[#1e293b] border border-gray-600 rounded-md shadow-lg z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          editTask(t.id);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-600 transition"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => updateStatus(t.id, "todo")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
                      >
                        ⚪ To Do
                      </button>

                      <button
                        onClick={() => updateStatus(t.id, "progress")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
                      >
                        ⏳ In Progress
                      </button>

                      <button
                        onClick={() => updateStatus(t.id, "completed")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 transition"
                      >
                        ✔️ Completed
                      </button>

                      <button
                        onClick={() => deleteTask(t.id)}
                        className="w-full text-left px-4 py-2 hover:bg-red-600 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
