import { useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";

export default function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState(() => {
    const savedQuizzes = localStorage.getItem("quiz");
    return savedQuizzes ? JSON.parse(savedQuizzes) : [];
  });
  useEffect(() => {
    if (quiz.length > 0) {
      localStorage.setItem("quiz", JSON.stringify(quiz));
    } else {
      localStorage.removeItem("quiz");
    }
  }, [quiz]);
  return (
    <>
      <QuizContext.Provider value={{ quiz, setQuiz }}>
        {children}
      </QuizContext.Provider>
    </>
  );
}
