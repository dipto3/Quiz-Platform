import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import DashboardLayout from "./components/admin/DashboardLayout";
import AddQuestionPage from "./components/admin/quiz/AddQuestionPage";
import CreateQuiz from "./components/admin/quiz/CreateQuiz";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import HomePage from "./components/frontend/HomePage";
import PrivateRoutes from "./routes/PrivateRoutes";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
          <Route path="create-question" element={<AddQuestionPage />} />
        </Route>
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       
      </Routes>
    </>
  );
}
