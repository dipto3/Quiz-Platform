// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAxios from "../../../hooks/useAxios";

// export default function QuestionList({ quiz,questions }) {
//   const { api } = useAxios();
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchQuestions() {
//       try {
//         setLoading(true); // Loading শুরু
//         const response = await api.get(
//           `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
//         );
//         const allQuestions = response.data;
//         console.log("All Questions:", allQuestions);

//         if (quiz?.id) {
//           const questionsByQuiz = allQuestions.filter(
//             (question) => question.quizId === quiz.id
//           );
//           setFilteredQuestions(questionsByQuiz);
//         }
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError(err);
//       } finally {
//         setLoading(false); // Loading শেষ
//       }
//     }

//       fetchQuestions();

//   }, [questions?.id]);

//   if (loading) {
//     return <p>Loading questions...</p>;
//   }

//   if (error) {
//     return <p>Error fetching questions: {error.message}</p>;
//   }

//   return (
//     <div className="px-4">
//       <div className="rounded-lg overflow-hidden shadow-sm mb-4">
//         <div className="bg-white p-6 !pb-2">
//           {filteredQuestions.length > 0 ? (
//             filteredQuestions.map((question) => (
//               <div key={question.id} className="mb-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">{question.question}</h3>
//                 </div>
//                 <div className="space-y-2">
//                   {question.options.map((option, index) => (
//                     <label key={index} className="flex items-center space-x-3">
//                       <input
//                         type="radio"
//                         name={`answer-${question.id}`}
//                         className="form-radio text-purple"
//                       />
//                       <span>{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No questions available for this quiz.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Question from "./Question";

export default function QuestionList({ quiz, questions }) {
  const { api } = useAxios();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch questions only when questions state changes
    async function fetchQuestions() {
      try {
        // Loading
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        );
        const allQuestions = response.data;
        // console.log(allQuestions,"a");
        if (quiz?.id) {
          const questionsByQuiz = allQuestions.find(
            (question) => question.id === quiz.id
          );
          setFilteredQuestions(questionsByQuiz?.Questions);
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err);
      } finally {
        setLoading(false); // Loading
      }
    }

    if (questions.length > 0) {
      fetchQuestions();
    }
  }, [questions]);

  // if (loading) {
  //   return <p>Loading questions...</p>;
  // }

  if (error) {
    return <p>Error fetching questions: {error.message}</p>;
  }
  console.log(filteredQuestions, "filteredQuestions");

  return (
    <>
      <div className="px-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Question key={question.id} question={question} />
          ))
        ) : (
          <p className="text-red-500">No questions available for this quiz.</p>
        )}
      </div>
    </>
  );
}
