import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        My Blog
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        {user && (
          <Link to="/create" className="hover:text-gray-300">
            Create Post
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="border px-3 py-1 rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="border px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
