import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Question from "./Question";

export default function QuizPage() {
  const { id } = useParams();
  const { api } = useAxios();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${id}`
        );
        setQuestions(response.data.data.questions);
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
  function handlePreviousQuestion () {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  return (
    <>
      <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
            <div>
              <h2 className="text-4xl font-bold mb-4">React Hooks Quiz</h2>
              <p className="text-gray-600 mb-4">
                A quiz on React hooks like useState, useEffect, and useContext.
              </p>

              <div className="flex flex-col">
                <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Total number of questions : 10
                </div>

                <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Participation : 1
                </div>

                <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Remaining : 9
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center">
              <img
                src="./assets/avater.webp"
                alt="Mr Hasan"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <span className="text-black font-semibold">Saad Hasan</span>
            </div>
          </div>

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
