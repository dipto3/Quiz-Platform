import { useState } from "react";
import useAxios from "../../../hooks/useAxios";

export default function Question({ question, onDelete, onEdit }) {
  const [error, setError] = useState(null);
  const { api } = useAxios();

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) return;
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${question.id}`
      );
      if (response.status === 200) {
        onDelete(question.id);
      } else {
        throw new Error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error Deleting questions:", error);
      setError(error);
    }
  }
  const handleEdit = () => {
    onEdit(question);
  };
  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-sm mb-4">
        <div className="bg-white p-6 !pb-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{question.question}</h3>
          </div>

          {question.options.length > 0 ? (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={`answer-${question.id}`}
                    className="form-radio text-buzzr-purple"
                    value={option}
                    checked={option === question.correctAnswer}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <p>No options available for this question.</p>
          )}
        </div>
        <div className="flex space-x-4 bg-primary/10 px-6 py-2">
          <button
            className="text-red-600 hover:text-red-800 font-medium"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="text-primary hover:text-primary/80 font-medium"
            onClick={handleEdit}
          >
            Edit Question
          </button>
        </div>
      </div>
    </>
  );
}
