export default function LoginForm() {
  return (
    <>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Enter your username or email address
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Username or email address"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Enter your Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Password"
          />
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
