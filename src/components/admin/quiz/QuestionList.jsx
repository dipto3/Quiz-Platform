import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Question from "./Question";

export default function QuestionList({ quiz, questions, onEdit }) {
  const { api } = useAxios();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchQuestions() {
      try {
        // Loading
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        );
        const allQuestions = response.data;
        // console.log(allQuestions,"a");
        if (quiz?.id) {
          const questionsByQuiz = allQuestions.find(
            (question) => question.id === quiz.id
          );
          setFilteredQuestions(questionsByQuiz?.Questions);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err);
      } finally {
        setLoading(false); // Loading
      }
    }

    if (questions.length > 0) {
      fetchQuestions();
    }
  }, [questions]);

  function handleDeleteQuestion(questionId) {
    const deletedQuestions = filteredQuestions.filter(
      (question) => question.id !== questionId
    );
    setFilteredQuestions(deletedQuestions);
  }
  // if (loading) {
  //   return <p>Loading questions...</p>;
  // }

  if (error) {
    return <p>Error fetching questions: {error.message}</p>;
  }
  console.log(filteredQuestions, "filteredQuestions");

  return (
    <>
      <div className="px-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onDelete={handleDeleteQuestion}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="text-red-500">No questions available for this quiz.</p>
        )}
      </div>
    </>
  );
}
