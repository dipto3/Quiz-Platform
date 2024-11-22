import { Route, Routes } from "react-router-dom";

import CreateQuiz from "./components/admin/CreateQuiz";
import Dashboard from "./components/admin/Dashboard";
import DashboardLayout from "./components/admin/DashboardLayout";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import HomePage from "./components/frontend/HomePage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
        </Route>
      </Routes>
    </>
  );
}
