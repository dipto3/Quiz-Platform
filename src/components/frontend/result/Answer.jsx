export default function Answer({ attemptedQuiz }) {
  // console.log(attemptedQuiz.questions);
  return (
    <>
      <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
        <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
          <div className="px-4">
            {attemptedQuiz.questions.map((question) => (
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
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          name={`answer${question.id}`}
                          className="form-radio text-buzzr-purple"
                          checked={question.correctAnswer === option}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
