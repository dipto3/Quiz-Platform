import { useContext } from "react";
import { QuizListContextAdmin } from "../context/QuizListContextAdmin";

export function useQuizListAdmin() {
    return useContext(QuizListContextAdmin);
}