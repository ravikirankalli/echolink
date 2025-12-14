import { useState } from "react";
import { supabase } from "../supabase/config";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image to Supabase Storage
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert("Image upload failed");
        return;
      }

      // 2️⃣ Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // 3️⃣ Insert blog into database
      const { error: insertError } = await supabase
        .from("blogs")
        .insert([
          {
            title,
            content,
            image_url: imageUrl,
          },
        ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        alert("Failed to create blog post");
        return;
      }

      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-xl mx-auto space-y-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold text-center">
        Create New Blog Post
      </h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Content"
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
}
