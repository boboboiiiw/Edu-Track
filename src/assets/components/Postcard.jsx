import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { ThumbsUp, ThumbsDown, Star, StarOff } from "lucide-react";
import CommentSection from "./CommentSection";

const PostCard = ({
  post,
  comments,
  onAddComment,
  onLike,
  onDislike,
  onToggleRecommend,
  currentRole,
  currentUser,
}) => {
  const isRecommendedByCurrentDosen =
    currentRole === "Dosen" && post.recommendedBy.includes(currentUser);

  return (
    <Card className="mb-6 shadow-lg rounded-2xl border bg-white transition hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          {post.recommendedBy.length > 0 && (
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-600"
            >
              ⭐ {post.recommendedBy.length} Rekomendasi
            </Badge>
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
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1 text-green-600 hover:bg-green-50"
          >
            <ThumbsUp size={16} /> {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDislike(post.id)}
            className="flex items-center gap-1 text-red-600 hover:bg-red-50"
          >
            <ThumbsDown size={16} /> {post.dislikes}
          </Button>

          {currentRole === "Dosen" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleRecommend(post.id)}
              className="flex items-center gap-1 text-yellow-500 hover:bg-yellow-50 ml-auto"
            >
              {isRecommendedByCurrentDosen ? (
                <Star size={16} />
              ) : (
                <StarOff size={16} />
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
