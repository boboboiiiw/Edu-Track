import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "@/components/utils/api";
import { Button } from "@/components/ui/button";
import PostCard from "@/assets/components/Postcard";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth(); // user: { id, name, role }
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await apiRequest(`/posts/${id}`);
        setPost(data);
      } catch {
        toast.error("Gagal mengambil post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await apiRequest(`/comments/post/${id}`);
        setComments(res.comments); // ambil hanya bagian komentar
      } catch {
        toast.error("Gagal mengambil komentar.");
      }
    };

    if (id) fetchComments();
  }, [id]);

  // Tambah komentar baru
  const handleAddComment = async (postId, content) => {
    try {
      const res = await apiRequest("/comments", {
        method: "POST",
        body: JSON.stringify({ post_id: postId, content }),
      });

      setComments((prev) => [...prev, res.comment]);
      toast.success("Komentar ditambahkan.");
    } catch {
      toast.error("Gagal menambahkan komentar.");
    }
  };

  if (loading) return <p>Memuat...</p>;
  if (!post) return <p>Post tidak ditemukan.</p>;

  console.log(user?.role);
  console.log(user?.id);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="mb-6">
        <Button variant="outline" onClick={() => window.history.back()}>
          ⬅️ Kembali
        </Button>
      </div>

      <PostCard
        post={post}
        comments={comments}
        onAddComment={handleAddComment}
        currentRole={user?.role}
        currentUser={user?.name}
      />
    </div>
  );
};

export default PostDetailPage;
