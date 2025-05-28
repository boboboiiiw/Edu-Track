import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  StarOff,
  Info,
  Loader2,
} from "lucide-react";
import CommentSection from "./CommentSection";
import { toast } from "sonner";
import usePostInteractions from "@/hooks/usePostInteraction";
import usePostRecommendation from "@/hooks/usePostRecommendation";

const PostCard = ({
  post,
  comments,
  onAddComment,
  currentRole,
  currentUser,
}) => {
  const { likePost, dislikePost, loading } = usePostInteractions();
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  const { recommendPost, unrecommendPost } = usePostRecommendation();
  const [recommendedBy, setRecommendedBy] = useState(post.recommendedBy || []);
  const [recommending, setRecommending] = useState(false);

  const isRecommendedByCurrentDosen =
    currentRole === "Dosen" &&
    recommendedBy.some((u) =>
      u.name === currentUser.name
    );

  const handleToggleRecommend = async () => {
    try {
      setRecommending(true);
      const fn = isRecommendedByCurrentDosen ? unrecommendPost : recommendPost;
      const res = await fn(post.id);

      if (res.success) {
        toast.success(res.data.message);
        setRecommendedBy(res.data.recommended_by);
      } else {
        toast.error("Gagal memperbarui rekomendasi.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setRecommending(false);
    }
  };

  const handleLike = async () => {
    const res = await likePost(post.id);
    if (res.success) {
      toast.success(res.data.message);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } else {
      toast.error("Gagal menyukai post.");
    }
  };

  const handleDislike = async () => {
    const res = await dislikePost(post.id);
    if (res.success) {
      toast.success(res.data.message);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } else {
      toast.error("Gagal tidak menyukai post.");
    }
  };

  return (
    <Card className="mb-6 shadow-lg rounded-2xl border bg-white transition hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{post.title}</h2>

          {recommendedBy.length > 0 && (
            <div className="relative group inline-block">
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-yellow-600 border-yellow-600 cursor-pointer"
              >
                ⭐ {recommendedBy.length} Rekomendasi
              </Badge>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex">
                <div className="bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 whitespace-nowrap">
                  Jumlah dosen yang merekomendasikan rangkuman ini
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 mb-2">
          Diposting oleh <span className="font-medium">{post.author}</span> •{" "}
          {new Date(post.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <p className="text-gray-700 mt-3">{post.content}</p>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Referensi:</h3>
          <ul className="list-disc ml-6 text-sm text-blue-600">
            {post.references.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={loading}
            className="flex items-center gap-1 text-green-600 hover:bg-green-50"
          >
            <ThumbsUp size={16} /> {likes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            disabled={loading}
            className="flex items-center gap-1 text-red-600 hover:bg-red-50"
          >
            <ThumbsDown size={16} /> {dislikes}
          </Button>

          {currentRole === "Dosen" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleRecommend}
              disabled={recommending}
              className="flex items-center gap-1 text-yellow-500 hover:bg-yellow-50 ml-auto"
            >
              {recommending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : isRecommendedByCurrentDosen ? (
                <StarOff size={16} />
              ) : (
                <Star size={16} />
              )}
              {isRecommendedByCurrentDosen
                ? "Batalkan Rekomendasi"
                : "Rekomendasikan"}
            </Button>
          )}
        </div>

        <Separator className="my-5" />

        <CommentSection
          comments={comments}
          onAddComment={onAddComment}
          postId={post.id}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;
