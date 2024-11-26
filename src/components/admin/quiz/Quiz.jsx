export default function Quiz({ quiz }) {
  return (
    <>
      <div
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
        key={quiz.id}
      >
        <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
            <path d="M12 12l4 -2.25l4 -2.25" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-4 -2.25l-4 -2.25" />
            <path d="M20 12l-4 2v4.75" />
            <path d="M4 12l4 2l0 4.75" />
            <path d="M8 5.25l4 2.25l4 -2.25" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
          {quiz.title}
        </h3>
        <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
          {quiz.description}
        </p>
        {quiz.status === "draft" && (
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Publish
          </button>
        )}
        {quiz.status === "published" && (
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Published
          </span>
        )}
      </div>
    </>
  );
}