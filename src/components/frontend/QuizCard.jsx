import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();
  const { api } = useAxios();

  const handleResultNavigate = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quiz.id}`
      );
      navigate("/results", {
        state: {
          attemptedQuiz: response.data.data,
          // resultsData: response.data.data,
        },
      });
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  const linkPath = quiz.is_attempted ? null : `/quiz/${quiz.id}`;

  return (
    <>
      <Link
        to={linkPath}
        onClick={quiz.is_attempted ? handleResultNavigate : null}
       
        className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
      >
        <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
          <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
            {quiz.title}
          </h1>
          <p className="mt-2 text-lg">{quiz.description}</p>
        </div>
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            {quiz.is_attempted && (
              <>
                <h1 className="text-3xl font-bold">Already Participated</h1>
                <p className="text-center">Click to view your leaderboard</p>
              </>
            )}
          </div>
        </div>
        <img
          src={quiz.thumbnail}
          alt="JavaScript Hoisting"
          className="w-full h-full object-cover rounded mb-4"
        />
      </Link>
    </>
  );
}
