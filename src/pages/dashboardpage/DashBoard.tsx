import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, CircleCheck, Clock, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { loadProjects, loadTasks } from "../../types/projectStorage";

interface Task {
  id: number;
  title: string;
  description: string;
  issueDate: string;
  status: "todo" | "progress" | "completed";
  priority: "low" | "medium" | "fast";
}

interface Project {
  id: number;
  name: string;
  description?: string;
  color?: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    try {
      const ps = loadProjects() || [];
      setProjects(ps);

      let tasksAggregate: Task[] = [];
      ps.forEach((p) => {
        const ts = loadTasks(p.id) || [];
        tasksAggregate = [...tasksAggregate, ...ts];
      });

      setAllTasks(tasksAggregate);
    } catch (err) {
      console.error("Failed to load projects/tasks", err);
      setProjects([]);
      setAllTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 2000);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "projects" || (e.key && e.key.startsWith("tasks_"))) {
        fetchData();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(id);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const totalProjects = projects.length;
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(
    (t) => t.status === "completed"
  ).length;

  const overdueTasks = useMemo(() => {
    const today = new Date();
    return allTasks.filter(
      (t) =>
        t.issueDate && new Date(t.issueDate) < today && t.status !== "completed"
    ).length;
  }, [allTasks]);

  const completionRate =
    totalTasks === 0
      ? "0%"
      : `${Math.round((completedTasks / totalTasks) * 100)}%`;

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: <FolderKanban size={26} />,
      bg: "bg-blue-600",
    },
    {
      title: "Completed Tasks",
      value: `${completedTasks}/${totalTasks}`,
      icon: <CircleCheck size={26} />,
      bg: "bg-green-600",
    },
    {
      title: "Completion Rate",
      value: completionRate,
      icon: <Clock size={26} />,
      bg: "bg-yellow-600",
    },
    {
      title: "Overdue Tasks",
      value: overdueTasks,
      icon: <TriangleAlert size={26} />,
      bg: "bg-red-600",
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Overview of your projects and tasks</p>
        </div>

        <div className="flex">
          <Link to="/dashboard/projects">
            <button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg ">
              View Projects
            </button>
          </Link>
        </div>
      </div>

      <div className="h-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl border border-white/10 flex justify-between items-center `}
          >
            <div>
              <h3 className="text-sm text-white/80">{item.title}</h3>
              <p className="text-2xl font-bold mt-2 text-white">{item.value}</p>
            </div>

            <div className={`text-2xl p-3 rounded-lg text-white ${item.bg}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold text-white mb-3">
              Recent Projects
            </h2>
            <button
              className="cursor-pointer hover:bg-cyan-400 w-28 h-8 rounded-xl"
              onClick={() => navigate("/dashboard/projects")}
            >
              view all
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 text-center text-gray-300">
              No projects yet
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
              {projects
                .slice()
                .reverse()
                .slice(0, 4)
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1e293b] border border-white/10 rounded-xl p-4 text-white shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg"
                        style={{ backgroundColor: p.color || "#334155" }}
                      >
                        {p.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-400">
                          {p.description || "No description"}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-400">
                      Tasks: {loadTasks(p.id)?.length || 0}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Upcoming Deadlines
          </h2>

          {allTasks.filter((t) => t.issueDate).length === 0 ? (
            <div className="bg-[#1e293b] rounded-xl p-6 text-center text-gray-300">
              No upcoming deadlines
            </div>
          ) : (
            <div className="space-y-4">
              {allTasks
                .filter((t) => t.status !== "completed" && t.issueDate)
                .sort(
                  (a, b) =>
                    new Date(a.issueDate).getTime() -
                    new Date(b.issueDate).getTime()
                )
                .slice(0, 5)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-[#1e293b] border border-white/10 rounded-xl p-4"
                  >
                    <div>
                      <h3 className="font-semibold text-white">{task.title}</h3>
                      <p className="text-sm text-gray-400">
                        Due: {new Date(task.issueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-lg ${
                        task.priority === "fast"
                          ? "bg-red-600"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-6 text-sm text-gray-300">Updating dashboard...</div>
      )}
    </div>
  );
}
