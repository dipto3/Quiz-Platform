import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

export default function QuizList() {
  const { api } = useAxios();
  const [quizzes, setQuizzes] = useState([]);
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
        quizzes.map((quiz) => (
          <div
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
            key={quiz.id}
          >
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                <path d="M12 12l4 -2.25l4 -2.25" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-4 -2.25l-4 -2.25" />
                <path d="M20 12l-4 2v4.75" />
                <path d="M4 12l4 2l0 4.75" />
                <path d="M8 5.25l4 2.25l4 -2.25" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              {quiz.title}
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              {quiz.description}
            </p>
          </div>
        ))
      ) : (
        <p>No quizzes found</p>
      )}
    </>
  );
}
