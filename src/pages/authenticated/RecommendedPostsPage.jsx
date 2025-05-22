import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";

const dummyPosts = [
  /* post yang sama dengan global state */
];

const RecommendedPostsPage = () => {
  const popularPosts = dummyPosts
    .filter((post) => post.recommendedBy.length > 0 || post.likes > 10)
    .sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">⭐ Postingan Direkomendasikan</h1>

      {popularPosts.length > 0 ? (
        popularPosts.map((post) => (
          <Card key={post.id} className="mb-4">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-700">
                {post.content.slice(0, 100)}...
              </p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown size={14} /> {post.dislikes}
                </span>
                {post.recommendedBy.length > 0 && (
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Star size={14} /> {post.recommendedBy.length} Rekomendasi
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-sm text-gray-500">Belum ada postingan terpopuler.</p>
      )}
    </div>
  );
};

export default RecommendedPostsPage;
