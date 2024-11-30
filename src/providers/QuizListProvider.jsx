import { useEffect, useState } from "react";
import { QuizListContextAdmin } from "../context/QuizListContextAdmin";

export default function QuizListProvider({ children }) {
  const [quizzes, setQuizzes] = useState(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    return savedQuizzes ? JSON.parse(savedQuizzes) : [];
  });
  useEffect(() => {
    if (quizzes.length > 0) {
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    } else {
      localStorage.removeItem("quizzes");
    }
  }, [quizzes]);
  return (
    <>
      <QuizListContextAdmin.Provider value={{ quizzes, setQuizzes }}>
        {children}
      </QuizListContextAdmin.Provider>
    </>
  );
}
