import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function CommentSection({ blogId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const snap = await getDocs(collection(db, "blogs", blogId, "comments"));
    setComments(snap.docs.map(doc => doc.data()));
  };

  useEffect(() => { fetchComments(); }, []);

  const submit = async () => {
    await addDoc(collection(db, "blogs", blogId, "comments"), { name, comment });
    fetchComments();
  };

  return (
    <div className="mt-6">
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Comment" onChange={e=>setComment(e.target.value)} />
      <button onClick={submit}>Add</button>

      {comments.map((c,i)=>(
        <p key={i}><b>{c.name}:</b> {c.comment}</p>
      ))}
    </div>
  );
}
