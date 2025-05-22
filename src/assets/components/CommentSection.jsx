import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const COMMENTS_PER_PAGE = 3;

const CommentSection = ({ comments, onAddComment, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  const paginatedComments = comments.slice(
    (page - 1) * COMMENTS_PER_PAGE,
    page * COMMENTS_PER_PAGE
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    onAddComment(postId, newComment);
    setNewComment("");
    setPage(1); // Reset ke halaman pertama saat komentar baru ditambahkan
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Komentar:</h3>

      <ul className="space-y-2 mb-4">
        {paginatedComments.map((comment, idx) => (
          <li
            key={idx}
            className="border border-gray-200 rounded-xl bg-gray-50 px-4 py-2 text-sm text-gray-700"
          >
            <strong className="text-gray-900">{comment.authorRole}:</strong>{" "}
            {comment.text}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ⬅️ Sebelumnya
          </Button>
          <span className="text-sm text-gray-500">
            Halaman {page} dari {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Selanjutnya ➡️
          </Button>
        </div>
      )}

      <Separator className="my-4" />

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tulis komentar..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <Button type="submit" className="text-sm">
          Kirim
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
