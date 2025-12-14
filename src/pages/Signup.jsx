import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 text-white py-3 rounded-full font-semibold shadow hover:opacity-90 transition">
          Sign Up
        </button>

        <p className="text-sm text-center mt-5 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 bg-clip-text text-transparent"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
