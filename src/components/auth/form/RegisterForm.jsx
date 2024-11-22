import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../../common/Field";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  async function submitForm(formData) {
    console.log(formData);
    try {
      if (formData.isAdmin) {
        formData.role = "admin";
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
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
      <form className="" onSubmit={handleSubmit(submitForm)}>
        <div className="">
          <div className="mb-4">
            <Field label="First Name" error={errors.full_name}>
              <input
                {...register("full_name", {
                  required: "Full Name is required",
                })}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
                  errors.full_name ? "border-red-500" : "border-gray-200"
                }`}
                name="full_name"
                type="text"
                id="full_name"
              />
            </Field>
          </div>

          <div className="mb-4">
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", {
                  required: "Full Name is required",
                })}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                name="email"
                type="email"
                id="email"
              />
            </Field>
          </div>

          <div className="mb-4">
            <Field label="Password" error={errors.password}>
              <input
                {...register("password", {
                  required: "Full Name is required",
                })}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
                name="password"
                type="password"
                id="password"
              />
            </Field>
          </div>
        </div>

        <div className="flex  gap-4">
          {/* <div className="mb-6">
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", {
                  required: "Full Name is required",
                })}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                name="email"
                type="email"
                id="email"
              />
            </Field>
          </div> */}

          {/* <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
              placeholder="Confirm Password"
            />
          </div> */}
        </div>

        <div className="mb-6 flex gap-2 items-center">
          <input
            {...register("isAdmin")}
            type="checkbox"
            id="admin"
            className="px-4 py-3 rounded-lg border border-gray-300"
          />
          <label htmlFor="admin" className="block ">
            Register as Admin
          </label>
        </div>
        <p className="text-red-500">{errors?.root?.random?.message}</p>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg mb-2"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
