import { useAuth } from "../../hooks/useAuth";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import QuizCard from "./QuizCard";

export default function HomePage() {
  const { auth } = useAuth();
  console.log(auth.user);
  const user = auth?.user;
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
                <QuizCard />
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </body>
    </>
  );
}
