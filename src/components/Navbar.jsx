import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          Echo Link
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-5 font-medium">
          <Link
            to="/"
            className="text-white hover:text-yellow-200 transition"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/create"
              className="text-white hover:text-purple-200 transition"
            >
              Write a Blog
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-200 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut(auth)}
              className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 hover:bg-red-500/80 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
