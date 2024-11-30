import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import LeaderboardProfile from "./LeaderboardProfile";
import QuizRanking from "./QuizRanking";

export default function LeaderboardPage() {
  const { quizId } = useParams();
  const [error, setError] = useState();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { api } = useAxios();
  // console.log(quizId,"quizId");
  useEffect(() => {
    async function getQuizLeaderboardData() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`
        );
        if (response.status === 200) {
          setLeaderboardData(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    getQuizLeaderboardData();
  }, [quizId]);

  console.log(leaderboardData, "leaderboardData");
  const firstAttempt = leaderboardData?.attempts?.[1];
  console.log(firstAttempt, "firstAttempt");
  return (
    <>
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <LeaderboardProfile leaderboardData={leaderboardData}/>
            <QuizRanking leaderboardData={leaderboardData} />
          </div>
        </div>
      </main>
    </>
  );
}
