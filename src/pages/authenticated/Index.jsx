import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../../assets/components/Postcard";
import { Button } from "@/components/ui/button"; // pastikan path ini sesuai

const Index = () => {
  const navigate = useNavigate();

  const currentRole = "Dosen";
  const currentUser = "dosen001";

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Rangkuman Bab 1: Pendahuluan",
      content: "Bab ini membahas dasar-dasar penelitian...",
      references: ["https://example.com/artikel1", "https://linklain.com"],
      likes: 0,
      dislikes: 0,
      recommendedBy: [],
      author: "Boy",
      createdAt: "2025-05-20T10:30:00Z",
    },
  ]);

  const [comments, setComments] = useState({
    1: [
      { text: "Sangat bermanfaat!", authorRole: "Mahasiswa" },
      {
        text: "Tolong perjelas bagian metode penelitian.",
        authorRole: "Dosen",
      },
      { text: "Mantap, terima kasih sudah berbagi.", authorRole: "Mahasiswa" },
      { text: "Referensinya kurang relevan, cek ulang.", authorRole: "Dosen" },
      {
        text: "Saya suka penjelasan tentang latar belakang.",
        authorRole: "Mahasiswa",
      },
      { text: "Tolong tambahkan kutipan jurnal.", authorRole: "Dosen" },
      {
        text: "Apakah ini sudah disesuaikan dengan format kampus?",
        authorRole: "Mahasiswa",
      },
      { text: "Perlu dikaji ulang struktur kalimatnya.", authorRole: "Dosen" },
      { text: "Informasinya akurat, good job!", authorRole: "Mahasiswa" },
      {
        text: "Coba tambahkan bagian hasil penelitian sebelumnya.",
        authorRole: "Dosen",
      },
      { text: "Topik ini menarik, sangat relevan.", authorRole: "Mahasiswa" },
    ],
  });

  const handleAddComment = (postId, text) => {
    const newComment = { text, authorRole: currentRole };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
  };

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleDislike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  const handleToggleRecommend = (postId) => {
    if (currentRole !== "Dosen") return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyRecommended = post.recommendedBy.includes(currentUser);

        return {
          ...post,
          recommendedBy: alreadyRecommended
            ? post.recommendedBy.filter((id) => id !== currentUser)
            : [...post.recommendedBy, currentUser],
        };
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ⬅️ Kembali
        </Button>
      </div>

      {/* Daftar Post */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          comments={comments[post.id] || []}
          onAddComment={handleAddComment}
          onLike={handleLike}
          onDislike={handleDislike}
          onToggleRecommend={handleToggleRecommend}
          currentRole={currentRole}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default Index;
