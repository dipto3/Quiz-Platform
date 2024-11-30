import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useResultData } from "../../hooks/useResultData";
import Question from "./Question";
import QuizDashboard from "./QuizDashboard";

export default function QuizPage() {
  const { id } = useParams();
  const { api } = useAxios();
  const { results, setResults } = useResultData();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
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

  function handleAnswerChange(questionId, answer) {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  }
  // console.log(answers,"Answer");

  async function handleQuizSubmit() {
    try {
      const payload = { answers };
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${id}/attempt`,
        payload
      );
      console.log("quiz submitted successfully");
      setResults((prevResults) => [
        ...prevResults,
        { quizId: id, data: response.data.data },
      ]);

      navigate("/results", {
        state: { attemptedQuiz: quiz },
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }
  

  return (
    <>
      <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <QuizDashboard quiz={quiz} />

          {questions.length > 0 ? (
            <Question
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              isLast={currentQuestionIndex === questions.length - 1}
              isFirst={currentQuestionIndex === 0}
              onPrevious={handlePreviousQuestion}
              onAnswerChange={handleAnswerChange}
              onQuizSubmit={handleQuizSubmit}
            />
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </main>
    </>
  );
}
