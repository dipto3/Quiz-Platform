export default function QuizRanking({ leaderboardData }) {
    if (!leaderboardData || !Array.isArray(leaderboardData.attempts)) {
      return <p>No data available</p>;
    }
  
    const attemptsWithScores = leaderboardData.attempts.map((attempt) => {
      const score = attempt.submitted_answers.reduce((totalScore, answer) => {
        const correctAnswer = attempt.correct_answers.find(
          (ca) => ca.question_id === answer.question_id
        );
        return correctAnswer && correctAnswer.answer === answer.answer
          ? totalScore + correctAnswer.marks
          : totalScore;
      }, 0);
  
      return {
        ...attempt,
        score,
      };
    });
  
    attemptsWithScores.sort((a, b) => b.score - a.score);
    const top5Attempts = attemptsWithScores.slice(0, 5);
    return (
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="mb-6">{leaderboardData?.quiz?.title}</p>
        <ul className="space-y-4">
          {top5Attempts.map((attempt, index) => (
            <li className="flex items-center justify-between" key={attempt.id}>
              <div className="flex items-center">
                <img
                  src="./assets/avater.webp"
                  alt="User Avatar"
                  className="object-cover w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{attempt.user.full_name}</h3>
                  <p className="text-sm text-gray-500">{`${index + 1}th`}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{attempt.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  