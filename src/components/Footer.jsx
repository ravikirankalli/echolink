import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-500 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-2">Echo Link</h2>
          <p className="text-sm text-white/90">
            A modern blogging platform to share ideas, stories, and creativity.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/create" className="hover:underline">Write a Blog</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Signup</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-white/90">
            Built with React, Firebase, Supabase, and Tailwind CSS.
            Designed for learning and real-world use.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/30 text-center py-4 text-sm text-white/90">
        © {new Date().getFullYear()} Echo Link. All rights reserved.
      </div>
    </footer>
  );
}
