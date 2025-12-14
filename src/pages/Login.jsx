import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 px-4">
      
      <form
        onSubmit={login}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back ✨
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 text-white py-3 rounded-full font-semibold shadow hover:opacity-90 transition">
          Login
        </button>

        <p className="text-center text-sm mt-5 text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 bg-clip-text text-transparent"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
