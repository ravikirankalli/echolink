import { useState } from "react";
import { supabase } from "../supabase/config";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) return alert("All fields required");

    setLoading(true);

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, image);

    if (uploadError) {
      setLoading(false);
      return alert("Image upload failed");
    }

    const { data } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    await supabase.from("blogs").insert([
      { title, content, image_url: data.publicUrl },
    ]);

    alert("Blog published 🎉");
    setTitle("");
    setContent("");
    setImage(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-4 border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Write a Blog ✨
        </h2>

        <input
          placeholder="Blog Title"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your content..."
          rows="6"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-purple-600 file:via-blue-500 file:to-yellow-400 file:text-white cursor-pointer"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 text-white py-3 rounded-full font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
