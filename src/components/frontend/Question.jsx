export default function Question({question,onNext,isLast,onPrevious,isFirst}) {
  return (
    <>
      <div className="lg:col-span-2 bg-white">
        <div className="bg-white p-6 !pb-2 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">
              {question.question}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
              <input
                type="checkbox"
                name="answer1"
                className="form-radio text-buzzr-purple"
                checked
              />
              <span>0</span>
            </label>

            <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
              <input
                type="checkbox"
                name="answer2"
                className="form-radio text-buzzr-purple"
              />
              <span>-1</span>
            </label>

            <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
              <input
                type="checkbox"
                name="answer3"
                className="form-radio text-buzzr-purple"
              />
              <span>1</span>
            </label>

            <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
              <input
                type="checkbox"
                name="answer4"
                className="form-radio text-buzzr-purple"
              />
              <span>1</span>
            </label>
          </div>
          <div className="flex justify-between items-center mt-6">
            
          </div>
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className={`w-1/2 ml-auto py-2  px-4 rounded-md ${
              isFirst
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-indigo-800"
            }`}
          >
            {"<<"} Previous
          </button>
          <button
          type="submit"
          onClick={onNext}
          disabled={isLast}
          className={`w-1/2 ml-auto py-2 px-4 rounded-md ${
            isLast
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-primary text-white hover:bg-indigo-800"
          }`}
          >
            Next  {">>"} 
          </button>
        </div>
      </div>
    </>
  );
}
