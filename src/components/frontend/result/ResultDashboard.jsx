import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
export default function ResultDashboard({ resultData }) {
  // const { results } = useResultData();
  // console.log(results, "results returned");
  // const resultData = results;
  console.log(resultData, "from props");
  const totalQuestions = resultData.correct_answers.length;

  const correctAnswers = resultData.correct_answers.filter((correct) =>
    resultData.submitted_answers.some(
      (submitted) =>
        submitted.question_id === correct.question_id &&
        submitted.answer === correct.answer
    )
  );

  const correctCount = correctAnswers.length;

  const wrongCount = totalQuestions - correctCount;
  const correctMarks = correctAnswers.reduce((total, correct) => {
    return total + correct.marks;
  }, 0);
  return (
    <>
      <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
        <div>
          <div className="text-white">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                {resultData.quiz.title}
              </h2>
              <p>{resultData.quiz.description}</p>
            </div>

            <div className="my-6 flex items-center  ">
              <div className="w-1/2">
                <div className="flex gap-6 my-6">
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {totalQuestions}
                    </p>
                    <p className="text-gray-300">Questions</p>
                  </div>

                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {correctCount}
                    </p>
                    <p className="text-gray-300">Correct</p>
                  </div>

                  <div>
                    <p className="font-semibold text-2xl my-0">{wrongCount}</p>
                    <p className="text-gray-300">Wrong</p>
                  </div>
                </div>

                <Link
                  to={`/leaderboard/${resultData.quiz.id}`}
                  className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                >
                  View Leaderboard
                </Link>
              </div>

              <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {correctMarks}/{resultData.quiz.total_marks}
                  </p>
                  <p>Your Mark</p>
                </div>
                <div>
                  
                  <CircularProgressbar className="h-20"
                    value={resultData.percentage}
                    text={`${resultData.percentage}%`}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
