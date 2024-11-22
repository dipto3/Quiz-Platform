import { useState } from "react";
import { QuizContext } from "../context/QuizContext";

export default function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState(null);
  return (
    <>
      <QuizContext.Provider value={{ quiz, setQuiz }}>
        {children}
      </QuizContext.Provider>
    </>
  );
}
