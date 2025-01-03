import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../../public/assets/logo.svg";
export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // console.log(auth.user);
  const user = auth?.user;
  function handleLogout() {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/login");
  }
  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <Link className="text-white" to="/">
          <img src={logo} className="h-7" />
        </Link>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Logout
            </button>
          ) : (
            <Link
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
