import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useResultData } from "../../../hooks/useResultData";
import Answer from "./Answer";
import ResultDashboard from "./ResultDashboard";

export default function ResultPage() {
  const { auth } = useAuth();
  const location = useLocation();
  const { results } = useResultData();
  console.log(results, "Results from hook");
  // const resultData = results;
  const { attemptedQuiz } = location.state || {};
  const resultData =
    results.find((result) => result.quizId === attemptedQuiz.id && result.userId === auth.user.id)?.data || [];

  console.log(attemptedQuiz, "attemptedQuiz");
  console.log(resultData, "resultData");
  return (
    <>
      <body className="bg-background text-foreground min-h-screen">
        <div className="flex min-h-screen overflow-hidden">
          <img
            src="./assets/logo-white.svg"
            className="max-h-11 fixed left-6 top-6 z-50"
          />

          <ResultDashboard resultData={resultData} />

          <Answer attemptedQuiz={attemptedQuiz} resultData={resultData} />
        </div>
      </body>
    </>
  );
}
