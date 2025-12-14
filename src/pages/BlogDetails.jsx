import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: blogData } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      const { data: commentsData } = await supabase
        .from("comments")
        .select("*")
        .eq("blog_id", id);

      setBlog(blogData);
      setComments(commentsData);
    };

    fetchData();
  }, [id]);

  const addComment = async () => {
    await supabase.from("comments").insert([
      { blog_id: id, name, message },
    ]);
    window.location.reload();
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={blog.image_url} />
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>

      <div className="mt-6">
        <input placeholder="Name" onChange={e=>setName(e.target.value)} />
        <input placeholder="Comment" onChange={e=>setMessage(e.target.value)} />
        <button onClick={addComment}>Add Comment</button>

        {comments.map(c => (
          <p key={c.id}><b>{c.name}:</b> {c.message}</p>
        ))}
      </div>
    </div>
  );
}
