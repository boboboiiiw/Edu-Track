import { useEffect, useState } from "react";
import { apiRequest } from "@/components/utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchMyPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiRequest(`/posts/all?author=self&page=${page}`);
      setPosts(res.posts);
      setPagination(res.pagination);
    } catch {
      toast.error("Gagal mengambil rangkuman Anda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts(page);
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📄 Rangkuman Saya</h1>
        <Button onClick={() => navigate("/posts/new")}>➕ Tambah Rangkuman</Button>
      </div>

      {loading ? (
        <p>Memuat...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="mb-4">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                Diposting pada{" "}
                {new Date(post.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-700">
                {post.content.slice(0, 120)}...
              </p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown size={14} /> {post.dislikes}
                </span>
                {post.recommendedBy?.length > 0 && (
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Star size={14} /> {post.recommendedBy.length} Rekomendasi
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">Belum ada rangkuman.</p>
      )}

      {/* Navigasi Halaman */}
      {pagination && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
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
    </div>
  );
};

export default MyPostsPage;
