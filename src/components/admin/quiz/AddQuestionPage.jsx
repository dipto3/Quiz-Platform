import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuiz } from "../../../hooks/useQuiz";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

export default function AddQuestionPage() {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const { quiz } = useQuiz();
  const location = useLocation();
  const quizz = location.state?.quiz || quiz;
  const [questions, setQuestions] = useState(quizz?.Questions || []);
  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const editQuestion = (updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
    setEditingQuestion(null);
  };

  function handleEdit(question) {
    setEditingQuestion(question);
  }
  console.log(questions, "AddQuestionPage");

  return (
    <>
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link
                  to="/admin/dashboard"
                  className="text-gray-600 hover:text-buzzr-purple"
                >
                  Home
                </Link>
                <svg
                  className="fill-current w-3 h-3 mx-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-buzzr-purple"
                  aria-current="page"
                >
                  Quizzes
                </a>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            <div className="">
              <h2 className="text-3xl font-bold mb-4">{quizz?.title}</h2>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions : {questions.length}
              </div>
              <p className="text-gray-600 mb-4">{quizz?.description}</p>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  Create Quiz
                </h2>

                <QuestionForm
                  addQuestion={addQuestion}
                  quiz={quizz}
                  editQuestion={editQuestion}
                  editingQuestion={editingQuestion}
                  setEditingQuestion={setEditingQuestion}
                />
              </div>
            </div>

            <QuestionList
              quiz={quizz}
              questions={questions}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </main>
    </>
  );
}
