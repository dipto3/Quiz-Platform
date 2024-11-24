import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { useQuiz } from "../../../hooks/useQuiz";
import Field from "../../common/Field";

export default function QuestionForm({ addQuestion }) {
  const { api } = useAxios();
  const [correctAnswer, setCorrectAnswer] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { quiz } = useQuiz();

  async function questionSubmit(formData) {
    const options = [
      formData.option1,
      formData.option2,
      formData.option3,
      formData.option4,
    ];

    const matchedOption =
      options[parseInt(correctAnswer.replace("option", "")) - 1];

    const questionPayload = {
      question: formData.question,
      options,
      correctAnswer: matchedOption || null,
    };

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${
          quiz.id
        }/questions`,
        questionPayload
      );
      const newQuestion = response.data.data;

      // Add the new question to the parent state
      addQuestion(newQuestion);
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "Something went wrong!",
      });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(questionSubmit)}>
        <div>
          <Field label="Question Title" error={errors.question}>
            <input
              {...register("question", {
                required: "Question title is required",
              })}
              className={`w-full mt-2 p-2 border ${
                errors.question ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter Question Title"
            />
          </Field>
        </div>

        <p className="text-sm text-gray-600 mt-4">Add Options</p>

        <div id="optionsContainer" className="space-y-2 mt-4">
          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              {...register("correctAnswer")}
              type="checkbox"
              id="option1"
              value="option1"
              name="correctAnswer"
              className="text-primary focus:ring-0 w-4 h-4"
              onChange={(e) =>
                setCorrectAnswer(e.target.checked ? e.target.value : "")
              }
            />
            <Field className="sr-only" error={false}>
              <input
                {...register("option1", {
                  required: "option1 is required",
                })}
                type="text"
                id="option1"
                name="option1"
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 1"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              {...register("correctAnswer")}
              type="checkbox"
              id="option2"
              name="correctAnswer"
              value="option2"
              className="text-primary focus:ring-0 w-4 h-4"
              onChange={(e) =>
                setCorrectAnswer(e.target.checked ? e.target.value : "")
              }
            />
            <Field className="sr-only" error={false}>
              <input
                {...register("option2", {
                  required: "option2 is required",
                })}
                type="text"
                id="option2"
                name="option2"
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 2"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              {...register("correctAnswer")}
              type="checkbox"
              id="option3"
              name="correctAnswer"
              value="option3"
              className="text-primary focus:ring-0 w-4 h-4"
              onChange={(e) =>
                setCorrectAnswer(e.target.checked ? e.target.value : "")
              }
            />
            <Field className="sr-only" error={false}>
              <input
                {...register("option3", {
                  required: "option3 is required",
                })}
                type="text"
                id="option3"
                name="option3"
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 3"
              />
            </Field>
          </div>

          <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
            <input
              {...register("correctAnswer")}
              type="checkbox"
              id="option4"
              value="option4"
              name="correctAnswer"
              className="text-primary focus:ring-0 w-4 h-4"
              onChange={(e) =>
                setCorrectAnswer(e.target.checked ? e.target.value : "")
              }
            />
            <Field className="sr-only" error={false}>
              <input
                {...register("option4", {
                  required: "option4 is required",
                })}
                type="text"
                id="option4"
                name="option4"
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder="Option 4"
              />
            </Field>
          </div>
        </div>
        <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
          Save Quiz
        </button>
      </form>
    </>
  );
}
