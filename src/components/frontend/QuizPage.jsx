import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Question from "./Question";
import QuizDashboard from "./QuizDashboard";

export default function QuizPage() {
  const { id } = useParams();
  const { api } = useAxios();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${id}`
        );
        setQuestions(response.data.data.questions);
        setQuiz(response.data.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    fetchQuestions();
  }, [id]);

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }
  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  return (
    <>
      <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <QuizDashboard quiz={quiz} />

          {/* {questions.map((question) => ( */}
          {questions.length > 0 ? (
            <Question
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              isLast={currentQuestionIndex === questions.length - 1}
              isFirst={currentQuestionIndex === 0}
              onPrevious={handlePreviousQuestion}
            />
          ) : (
            <p>Loading questions...</p>
          )}
          {/* ))} */}
        </div>
      </main>
    </>
  );
}
