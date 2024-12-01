import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Field from "../../common/Field";
export default function LoginForm() {
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  async function submitForm(formData) {
    // console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200 && response.data.data.user.role === "user") {
        const { tokens, user } = response.data.data;
        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      } else if (
        response.status === 200 &&
        response.data.data.user.role === "admin"
      ) {
        const { tokens, user } = response.data.data;
        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/admin/dashboard");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "Credentials does not exist in our records!",
      });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <p className="text-red-500 text-2xl">{errors?.root?.random?.message}</p>
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
        <div className="mb-6">
          <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required",
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
        <div className="mb-6 flex gap-2 items-center">
          <input
            type="checkbox"
            id="admin"
            className="px-4 py-3 rounded-lg border border-gray-300"
          />
          <label htmlFor="admin" className="block ">
            Login as Admin
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg mb-4"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
