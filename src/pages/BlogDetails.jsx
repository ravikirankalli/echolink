import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { data: blogData } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    const { data: commentsData } = await supabase
      .from("comments")
      .select("*")
      .eq("blog_id", id)
      .order("created_at", { ascending: false });

    setBlog(blogData);
    setComments(commentsData || []);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addComment = async () => {
    if (!name || !message) return alert("All fields required");

    setLoading(true);

    await supabase.from("comments").insert([
      {
        blog_id: id,
        name,
        message,
      },
    ]);

    setName("");
    setMessage("");
    setLoading(false);
    fetchData();
  };

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100">
        <p className="text-gray-700 font-medium">Loading blog...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 py-10 px-4">
      
      {/* Blog Container */}
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/40">
        
        {/* Blog Image */}
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-[420px] object-cover"
        />

        {/* Blog Content */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
            {blog.title}
          </h1>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>

          {/* Comments Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Comments ({comments.length})
            </h3>

            {/* Add Comment */}
            <div className="bg-gray-100 p-4 rounded-xl mb-6">
              <input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />

              <textarea
                placeholder="Write a comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 p-2 rounded mb-3"
              />

              <button
                onClick={addComment}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post Comment"}
              </button>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {comments.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              )}

              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-4 rounded-xl shadow-sm border"
                >
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  <p className="text-gray-700 text-sm mt-1">
                    {c.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
