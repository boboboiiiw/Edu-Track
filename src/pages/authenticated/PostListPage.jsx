import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Star, Search, BookOpen } from "lucide-react";

const POSTS_PER_PAGE = 4;

const dummyPosts = [
  {
    id: 1,
    title: "Rangkuman Bab 1: Pendahuluan",
    content: "Bab ini membahas dasar-dasar penelitian ilmiah secara umum...",
    likes: 10,
    dislikes: 2,
    recommendedBy: ["dosen1", "dosen2"],
    author: "Koling Dev",
    createdAt: "2025-05-20T10:30:00Z",
  },
  {
    id: 2,
    title: "Bab 2: Tinjauan Pustaka",
    content: "Pada bab ini dijelaskan teori-teori yang digunakan...",
    likes: 3,
    dislikes: 5,
    recommendedBy: [],
    author: "Koling Dev",
    createdAt: "2025-05-21T10:30:00Z",
  },
  {
    id: 3,
    title: "Rangkuman Bab 3: Metodologi Penelitian",
    content:
      "Metode kuantitatif digunakan untuk mengukur variabel secara objektif...",
    likes: 25,
    dislikes: 1,
    recommendedBy: ["dosen1"],
    author: "Koling Dev",
    createdAt: "2025-05-22T10:30:00Z",
  },
  {
    id: 4,
    title: "Bab 4: Analisis Data",
    content: "Data dianalisis menggunakan metode statistik regresi linier...",
    likes: 4,
    dislikes: 0,
    recommendedBy: [],
    author: "Koling Dev",
    createdAt: "2025-05-23T10:30:00Z",
  },
  {
    id: 5,
    title: "Bab 5: Kesimpulan",
    content: "Bab ini menyimpulkan hasil penelitian dan saran ke depan...",
    likes: 15,
    dislikes: 3,
    recommendedBy: ["dosen2"],
    author: "Koling Dev",
    createdAt: "2025-05-24T10:30:00Z",
  },
];

const PostListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let posts = [...dummyPosts];

    if (searchTerm.trim() !== "") {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === "like") {
      posts.sort((a, b) => b.likes - a.likes);
    } else if (filter === "dislike") {
      posts.sort((a, b) => b.dislikes - a.dislikes);
    } else if (filter === "recommended") {
      posts = posts.filter((p) => p.recommendedBy.length > 0);
    }

    return posts;
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <BookOpen size={24} /> Semua Postingan Mahasiswa
      </h1>

      {/* Search */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Cari judul atau isi..."
          className="pl-10"
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

      {/* Cards */}
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => (
          <Card
            key={post.id}
            className="mb-5 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-[#374151]">
                  {post.title}
                </h2>

                {post.recommendedBy.length > 0 && (
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
                {post.content.slice(0, 120)}...
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
          Tidak ada postingan yang sesuai.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            ⬅️ Sebelumnya
          </Button>
          <p className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Selanjutnya ➡️
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostListPage;
