import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="border rounded-lg shadow">
      <img src={blog.imageURL} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg">{blog.title}</h2>
        <Link to={`/blog/${blog.id}`} className="text-blue-600">Read More</Link>
      </div>
    </div>
  );
}
