import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import DashboardLayout from "./components/admin/DashboardLayout";
import AddQuestionPage from "./components/admin/quiz/AddQuestionPage";
import CreateQuiz from "./components/admin/quiz/CreateQuiz";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import HomePage from "./components/frontend/HomePage";
import PrivateRoutes from "./routes/PrivateRoutes";
import FrontendLayout from "./components/frontend/FrontendLayout";
import QuizPage from "./components/frontend/QuizPage";
import ResultPage from "./components/frontend/result/ResultPage";
import LeaderboardPage from "./components/frontend/leaderboard/LeaderboardPage";
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

        <Route element={<FrontendLayout />}>
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="leaderboard/:quizId" element={<LeaderboardPage />} />
        </Route>
        <Route path="results" element={<ResultPage />} />
        </Route>
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       
      </Routes>
    </>
  );
}
