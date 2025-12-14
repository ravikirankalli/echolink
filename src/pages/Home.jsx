import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      setBlogs(data || []);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100">
      
      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Latest Blogs ✍️
      </h1>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No blogs published yet
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
}
