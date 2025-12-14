import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      setBlogs([]);
      return;
    }

    setBlogs(data || []);
  };

  fetchBlogs();
}, []);
  return (
  <div className="grid md:grid-cols-3 gap-6 p-6">
    {blogs.length === 0 ? (
      <p className="text-center col-span-3">
        No blog posts yet
      </p>
    ) : (
      blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))
    )}
  </div>
);

}
