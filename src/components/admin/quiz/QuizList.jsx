import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuizListAdmin } from "../../../hooks/useQuizListAdmin";
import Quiz from "./Quiz";

export default function QuizList() {
  const { api } = useAxios();
  // const [quizzes, setQuizzes] = useState([]);
  const { quizzes, setQuizzes } = useQuizListAdmin();
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        );
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error Deleting questions:", error);
        setError(error);
      }
    }
    fetchQuiz();
  }, []);
  return (
    <>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => <Quiz key={quiz.id} quiz={quiz} />)
      ) : (
        <p>No quizzes found</p>
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </>
  );
}
