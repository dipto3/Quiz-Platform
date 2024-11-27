import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import QuizCard from "./QuizCard";
export default function HomePage() {
  const { auth } = useAuth();
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  console.log(auth.user);
  const user = auth?.user;
  useEffect(() => {
    async function getQuiz() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`
        );
        if (response.status === 200) {
          setQuizzes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError(error);
      }
    }
    getQuiz();
  }, []);
  return (
    <>
      <body className="bg-[#F5F3FF] min-h-screen">
        <div className="container mx-auto py-3">
          <Header />

          {user && (
            <div className="text-center mb-12">
              <img
                src="./assets/avater.webp"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
              />
              <p className="text-xl text-gray-600">Welcome</p>
              <h2
                className="text-4xl font-bold text-gray-700"
                style={{ fontFamily: "Jaro" }}
              >
                {user?.full_name}
              </h2>
            </div>
          )}
          <main className="bg-white p-6 rounded-md h-full">
            <section>
              <h3 className="text-2xl font-bold mb-6">
                Participate In Quizees
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                ) : (
                  <p className="text-center text-gray-600">
                    No quizzes available
                  </p>
                )}
               
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </body>
    </>
  );
}
