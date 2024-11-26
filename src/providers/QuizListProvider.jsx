import { useState } from "react";
import { QuizListContextAdmin } from "../context/QuizListContextAdmin";

export default function QuizListProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  return (
    <>
      <QuizListContextAdmin.Provider value={{ quizzes, setQuizzes }}>
        {children}
      </QuizListContextAdmin.Provider>
    </>
  );
}
