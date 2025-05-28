import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { apiRequest } from "@/components/utils/api";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const RecommendedPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil semua post dari backend
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await apiRequest("/posts/all?per_page=100");
        setPosts(res.posts || []);
      } catch (err) {
        console.error("Gagal mengambil rangkuman:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter dan sortir post populer
  const popularPosts = useMemo(() => {
    return posts
      .filter(
        (post) => (post.recommendedBy?.length || 0) > 0 || post.likes > 10
      )
      .sort((a, b) => b.likes - a.likes);
  }, [posts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">⭐ Rangkuman Direkomendasikan</h1>

      {loading ? (
        <p>Memuat rangkuman...</p>
      ) : popularPosts.length > 0 ? (
        popularPosts.map((post) => (
          <Card
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            className="mb-4 hover:cursor-pointer hover:shadow-md transition duration-200"
          >
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-700">
                {post.content.slice(0, 100)}...
              </p>
              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown size={14} /> {post.dislikes}
                </span>
                {post.recommendedBy?.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="text-yellow-600 border-yellow-500 flex items-center gap-1"
                        >
                          <Star size={14} /> {post.recommendedBy.length}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {post.recommendedBy.length} dosen merekomendasikan
                          rangkuman ini
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">Belum ada rangkuman terpopuler.</p>
      )}
    </div>
  );
};

export default RecommendedPostsPage;
