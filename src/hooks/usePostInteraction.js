import { useState } from "react";
import { apiRequest } from "@/components/utils/api";

/**
 * Custom hook untuk menangani interaksi like/dislike pada post.
 * @returns {object} fungsi handleLike, handleDislike, dan status loading.
 */
const usePostInteractions = () => {
  const [loading, setLoading] = useState(false);

  const likePost = async (postId) => {
    setLoading(true);
    try {
      const response = await apiRequest(`/posts/${postId}/like`, {
        method: "POST",
      });
      return { success: true, data: response };
    } catch (error) {
      console.error("Gagal menyukai post:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const dislikePost = async (postId) => {
    setLoading(true);
    try {
      const response = await apiRequest(`/posts/${postId}/dislike`, {
        method: "POST",
      });
      return { success: true, data: response };
    } catch (error) {
      console.error("Gagal tidak menyukai post:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { likePost, dislikePost, loading };
};

export default usePostInteractions;
