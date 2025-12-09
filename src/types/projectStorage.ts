export const loadProjects = () => {
  const data = localStorage.getItem("projects");
  return data ? JSON.parse(data) : [];
};

export const saveProjects = (projects: any[]) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

// =========  Add the tasks in localstorage =======================

export interface Task {
  id: number;
  title: string;
  description: string;
  issueDate: string;
  status: "todo" | "progress" | "completed";
  priority: "low" | "medium" | "fast";
}
export interface Project {
  id: number;
  name: string;
  description: string;
  color: string;
}

export const loadTasks = (projectId: number): Task[] => {
  const tasks = localStorage.getItem(`tasks_${projectId}`);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (projectId: number, tasks: Task[]) => {
  localStorage.setItem(`tasks_${projectId}`, JSON.stringify(tasks));
};
