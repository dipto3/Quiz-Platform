import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../hooks/useAxios";
import Field from "../../common/Field";
export default function QuestionForm({
  addQuestion,
  quiz,
  editQuestion,
  editingQuestion,
  setEditingQuestion,
}) {
  const { api } = useAxios();
  const [correctAnswer, setCorrectAnswer] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm();
  // const { quiz } = useQuiz();

  useEffect(() => {
    if (editingQuestion) {
      setValue("question", editingQuestion.question);
      setValue("option1", editingQuestion.options[0]);
      setValue("option2", editingQuestion.options[1]);
      setValue("option3", editingQuestion.options[2]);
      setValue("option4", editingQuestion.options[3]);
      setCorrectAnswer(
        `option${
          editingQuestion.options.indexOf(editingQuestion.correctAnswer) + 1
        }`
      );
    } else {
      reset();
    }
  }, [editingQuestion, setValue, reset]);

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
      id: editingQuestion?.id || undefined,
      question: formData.question,
      options,
      correctAnswer: matchedOption || null,
    };

    try {
      if (editingQuestion) {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${
            questionPayload.id
          }`,
          questionPayload
        );

        editQuestion(response.data);
        toast.success("Question Updated successfully!");
      } else {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${
            quiz.id
          }/questions`,
          questionPayload
        );

        const newQuestion = response.data.data;

        addQuestion(newQuestion);

        // Reset the form
        reset();
        setCorrectAnswer("");
        toast.success("Question Created successfully!");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "Something went wrong!",
      });
    }
  }
  function handleCancel() {
    reset();
    setEditingQuestion(null);
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
        {editingQuestion && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors mt-2"
          >
            Cancel
          </button>
        )}
      </form>
    </>
  );
}
