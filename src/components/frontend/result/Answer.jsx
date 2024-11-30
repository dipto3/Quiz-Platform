export default function Answer({ resultData, attemptedQuiz }) {
  // console.log(attemptedQuiz.questions);
  // console.log(resultData,"r");

  const submittedAnswers = resultData?.submitted_answers || [];
  const correctAnswers = resultData?.correct_answers || [];

  if (!attemptedQuiz?.questions || !submittedAnswers) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll">
        <div className="px-4">
          {attemptedQuiz.questions.map((question) => {
            const submittedAnswer = submittedAnswers.find(
              (submitted) => submitted.question_id === question.id
            )?.answer;
            const correctAnswer = correctAnswers.find(
              (correct) => correct.question_id === question.id
            )?.answer;

            return (
              <div
                className="rounded-lg overflow-hidden shadow-sm mb-4"
                key={question.id}
              >
                <div className="bg-white p-6 !pb-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {question.question}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const isSubmitted = submittedAnswer === option;
                      const isCorrect = correctAnswer === option;

                      return (
                        <label
                          key={option}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            className="form-radio text-buzzr-purple"
                            checked={question.correctAnswer === option}
                            readOnly
                          />
                          <span
                            className={`${
                              isSubmitted && !isCorrect
                                ? "text-red-500"
                                : isCorrect
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
