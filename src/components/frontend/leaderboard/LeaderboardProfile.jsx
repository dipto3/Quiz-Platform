import { useAuth } from "../../../hooks/useAuth";
import avatar from "../../../../public/assets/avater.webp";
export default function LeaderboardProfile({leaderboardData}) {
  const { auth } = useAuth();
  console.log(auth, "Auth data");
  const userAttempt = leaderboardData?.attempts?.find(
    (attempt) => attempt.user.id === auth?.user?.id
  );

  
  const totalMarks = userAttempt?.correct_answers?.reduce((sum, correctAnswer) => {
    const isCorrect = userAttempt.submitted_answers.some(
      (submittedAnswer) =>
        submittedAnswer.question_id === correctAnswer.question_id &&
        submittedAnswer.answer === correctAnswer.answer
    );
    return isCorrect ? sum + correctAnswer.marks : sum;
  }, 0) || 0;

  const correctCount = userAttempt?.correct_answers?.filter((correctAnswer) =>
    userAttempt.submitted_answers.some(
      (submittedAnswer) =>
        submittedAnswer.question_id === correctAnswer.question_id &&
        submittedAnswer.answer === correctAnswer.answer
    )
  ).length || 0;

  const wrongCount =
    userAttempt?.submitted_answers.length - correctCount || 0;
    const sortedAttempts = leaderboardData?.attempts
    ?.map((attempt) => {
      const marks =
        attempt.correct_answers?.reduce((sum, correctAnswer) => {
          const isCorrect = attempt.submitted_answers.some(
            (submittedAnswer) =>
              submittedAnswer.question_id === correctAnswer.question_id &&
              submittedAnswer.answer === correctAnswer.answer
          );
          return isCorrect ? sum + correctAnswer.marks : sum;
        }, 0) || 0;
      return { userId: attempt.user.id, marks };
    })
    .sort((a, b) => b.marks - a.marks);
  const position =
    sortedAttempts?.findIndex((attempt) => attempt.userId === auth?.user?.id) +
    1;
  return (
    <>
      <div className="bg-primary rounded-lg p-6 text-white">
        <div className="flex flex-col items-center mb-6">
          <img
            src={avatar}
            alt="Profile Pic"
            className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold">{auth?.user?.full_name}</h2>
          <p className="text-xl">{position} Position</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm opacity-75">Mark</p>
            <p className="text-2xl font-bold">{totalMarks}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-75">Correct</p>
            <p className="text-2xl font-bold">{correctCount}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-75">Wrong</p>
            <p className="text-2xl font-bold">{wrongCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
