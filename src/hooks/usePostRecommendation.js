import { apiRequest } from "@/components/utils/api";

const usePostRecommendation = () => {
  const recommendPost = async (postId) => {
    try {
      const res = await apiRequest(`/posts/${postId}/recommend`, {
        method: "POST",
      });
      return { success: true, data: res };
    } catch {
      return { success: false };
    }
  };

  const unrecommendPost = async (postId) => {
    try {
      const res = await apiRequest(`/posts/${postId}/unrecommend`, {
        method: "POST",
      });
      return { success: true, data: res };
    } catch {
      return { success: false };
    }
  };

  return { recommendPost, unrecommendPost };
};

export default usePostRecommendation;
