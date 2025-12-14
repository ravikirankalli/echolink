import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="font-bold text-xl mb-3 text-gray-800 line-clamp-2">
          {blog.title}
        </h2>

        <Link
          to={`/blog/${blog.id}`}
          className="inline-block mt-2 font-semibold bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 bg-clip-text text-transparent hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
