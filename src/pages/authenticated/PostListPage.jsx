import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from "@/components/utils/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Star, Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const POSTS_PER_PAGE = 4;

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await apiRequest(
          `/posts/all?page=${currentPage}&per_page=${POSTS_PER_PAGE}`
        );
        setPosts(res.posts);
        setPagination(res.pagination);
      } catch (error) {
        console.error("Gagal mengambil data rangkuman:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  // Filter & search posts
  const filteredPosts = useMemo(() => {
    let results = [...posts];

    if (searchTerm.trim() !== "") {
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === "like") {
      results.sort((a, b) => b.likes - a.likes);
    } else if (filter === "dislike") {
      results.sort((a, b) => b.dislikes - a.dislikes);
    } else if (filter === "recommended") {
      results = results.filter((p) => p.recommended_by?.length > 0);
    }

    return results;
  }, [posts, searchTerm, filter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <BookOpen size={24} /> Semua Rangkuman Mahasiswa
      </h1>

      {/* Search */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Cari judul atau isi..."
          className="pl-10 bg-white"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-medium text-gray-600">Urutkan:</span>
        {["all", "like", "dislike", "recommended"].map((type) => (
          <Button
            key={type}
            size="sm"
            variant={filter === type ? "default" : "outline"}
            onClick={() => handleFilterChange(type)}
          >
            {
              {
                all: "Semua",
                like: "👍 Like",
                dislike: "👎 Dislike",
                recommended: "⭐ Rekomendasi",
              }[type]
            }
          </Button>
        ))}
      </div>

      <Separator className="mb-6" />

      {loading ? (
        <p>Memuat rangkuman...</p>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Card
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            className="mb-5 hover:cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-[#374151]">
                  {post.title}
                </h2>
                {post.recommendedBy?.length > 0 && (
                  <Badge
                    variant="outline"
                    className="text-yellow-600 border-yellow-500"
                  >
                    ⭐ {post.recommendedBy.length} Dosen
                  </Badge>
                )}
              </div>

              <p className="text-xs text-gray-500 mb-2">
                Diposting oleh{" "}
                <span className="font-medium">{post.author}</span> •{" "}
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {post.content?.slice(0, 120)}...
              </p>

              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown size={14} /> {post.dislikes}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">
          Tidak ada rangkuman yang sesuai.
        </p>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center mt-6">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={pagination.current_page === 1}
          >
            ⬅️ Sebelumnya
          </Button>
          <p className="text-sm text-gray-600">
            Halaman {pagination.current_page} dari {pagination.total_pages}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setCurrentPage((p) => Math.min(pagination.total_pages, p + 1))
            }
            disabled={pagination.current_page === pagination.total_pages}
          >
            Selanjutnya ➡️
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostListPage;
