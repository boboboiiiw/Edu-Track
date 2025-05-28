import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/components/utils/api";
import { toast } from "sonner";

const CommentSection = ({ postId }) => {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchComments = async (page = 1) => {
    setLoading(true);
    try {
      const data = await apiRequest(`/comments/post/${postId}?page=${page}`);
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Gagal memuat komentar:", err);
      toast.error("Gagal memuat komentar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page);
  }, [page, postId]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      await apiRequest("/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id: postId,
          content: input,
        }),
      });
      toast.success("Komentar berhasil dikirim.");
      setInput("");
      fetchComments(page); // refresh komentar di halaman yang sama
    } catch {
      toast.error("Gagal menambahkan komentar.");
    }
  };

  return (
    <div className="space-y-5 mt-6">
      <h4 className="text-sm font-semibold text-gray-800">💬 Komentar</h4>

      {/* Daftar komentar */}
      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-gray-500">Memuat komentar...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Belum ada komentar.</p>
        ) : (
          comments.map((c) => (
            <Card key={c.id} className="bg-gray-50 border rounded-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-800">
                    {c.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{c.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Navigasi Pagination */}
      {pagination && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Halaman {pagination.current_page} dari {pagination.total_pages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.has_prev || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ⬅ Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.has_next || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Berikutnya ➡
            </Button>
          </div>
        </div>
      )}

      <Separator />

      {/* Form komentar baru */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-700">
          Tambahkan Komentar
        </h5>
        <Textarea
          placeholder="Tulis komentar Anda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
