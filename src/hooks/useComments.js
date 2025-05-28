import { useEffect, useState } from "react";
import { apiRequest } from "@/components/utils/api";
import { toast } from "sonner";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Ambil komentar berdasarkan postId
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await apiRequest(`/comments/post/${postId}`);
      setComments(res.comments || []);
    } catch (err) {
      toast.error("Gagal memuat komentar");
      console.error("fetchComments error:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  // Tambah komentar baru
  const addComment = async (content) => {
    try {
      const body = { post_id: postId, content };
      const res = await apiRequest("/comments", {
        method: "POST",
        body: JSON.stringify(body),
      });
      setComments((prev) => [...prev, res.comment]);
      toast.success("Komentar berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan komentar");
      console.error("addComment error:", err);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  return { comments, loadingComments, addComment };
};
