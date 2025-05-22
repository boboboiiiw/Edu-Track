import { useAuth } from "@/hooks/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";

const dummyPosts = [
  /* gunakan atau ambil dari state global/backend */
];

const MyPostsPage = () => {
  const { user } = useAuth();

  const userPosts = dummyPosts.filter((post) => post.author === user?.name);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📄 Postingan Saya</h1>

      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <Card key={post.id} className="mb-4">
            <CardContent className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                Diposting pada{" "}
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
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
        <p className="text-sm text-gray-500">Belum ada postingan.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
