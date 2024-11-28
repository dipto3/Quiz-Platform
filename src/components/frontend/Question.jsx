export default function Question({
  question,
  onNext,
  isLast,
  onPrevious,
  isFirst,
  onAnswerChange,
}) {
  function handleChange(option) {
    onAnswerChange(question.id, option);
  }

  return (
    <>
      <div className="lg:col-span-2 bg-white">
        <div className="bg-white p-6 !pb-2 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">{question.question}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
              >
                <input
                  type="radio"
                  name="answer1"
                  className="form-radio text-buzzr-purple"
                  value={option}
                  onChange={() => handleChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6"></div>
          <button
            onClick={onPrevious}
            hidden={isFirst}
            className={`w-1/2 ml-auto py-2  px-4 rounded-md ${
              isFirst
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-indigo-800"
            }`}
          >
            {"<<"} Previous
          </button>
          <button
            onClick={onNext}
            hidden={isLast}
            className={`w-1/2 ml-auto py-2 px-4 rounded-md ${
              isLast
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-indigo-800"
            }`}
          >
            Next {">>"}
          </button>
          {isLast && (
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
