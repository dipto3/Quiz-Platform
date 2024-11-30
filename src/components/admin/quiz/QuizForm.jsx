import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useQuiz } from "../../../hooks/useQuiz";
import Field from "../../common/Field";

export default function QuizForm() {
  const { api } = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { setQuiz } = useQuiz();
  async function submitQuiz(formData) {
    // console.log(formData);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`,
        formData
      );
      if (response.status === 201) {
        const quizData = response.data.data;
        setQuiz(quizData);
        navigate("/admin/create-question");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "Something went wrong!",
      });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitQuiz)}>
        <div className="mb-4">
          <Field
            label="Quiz title"
            error={errors.title}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <input
              {...register("title", {
                required: "Quiz title is required",
              })}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
              name="title"
              type="text"
              id="title"
              placeholder="Quiz"
            />
          </Field>
        </div>

        <div className="mb-6">
          <Field
            label="Description
              (Optional)"
            error={errors.description}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <textarea
              {...register("description")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
              id="description"
              name="description"
              rows="4"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Next
        </button>
      </form>
    </>
  );
}
