import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/dashboardpage/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/dashboardpage/Settings";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Projects from "./pages/dashboardpage/Projects";
import ProjectTask from "./pages/dashboardpage/ProjectTask";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
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
