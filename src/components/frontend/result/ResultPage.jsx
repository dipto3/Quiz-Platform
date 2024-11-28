import { useLocation } from "react-router-dom";
import Answer from "./Answer";
import ResultDashboard from "./ResultDashboard";

export default function ResultPage() {
  const location = useLocation();
  const { resultData, attemptedQuiz } = location.state || {};
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

          <ResultDashboard resultData={resultData}/>

          <Answer attemptedQuiz={attemptedQuiz}/>
        </div>
      </body>
    </>
  );
}
