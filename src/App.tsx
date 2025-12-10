import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/dashboardpage/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/dashboardpage/Settings";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Projects from "./pages/dashboardpage/Projects";
import ProjectTask from "./pages/dashboardpage/ProjectTask";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardLayout darkMode={darkMode} setDarkMode={setDarkMode} />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectTask />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
