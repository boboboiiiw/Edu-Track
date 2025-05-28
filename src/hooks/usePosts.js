// src/hooks/usePosts.js
import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from "@/components/utils/api";


export const usePosts = (initialPage = 1, initialPerPage = 10) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async (page = initialPage, per_page = initialPerPage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`/posts/all?page=${page}&per_page=${per_page}`, {
        method: 'GET',
      });
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [initialPage, initialPerPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const getPostById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`/posts/${id}`, { method: 'GET' });
      return data;
    } catch (err) {
      setError(err.message || `Failed to fetch post with ID ${id}`);
      throw err; // Lempar ulang agar komponen pemanggil bisa menangani
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
      // Setelah berhasil membuat, refresh daftar post atau tambahkan post baru ke state
      fetchPosts(); 
      return data;
    } catch (err) {
      setError(err.message || 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  const likePost = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`/posts/${id}/like`, { method: 'POST' });
      // Perbarui state post jika diperlukan (misalnya, jumlah likes)
      return data;
    } catch (err) {
      setError(err.message || `Failed to like post with ID ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const dislikePost = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(`/posts/${id}/dislike`, { method: 'POST' });
      return data;
    } catch (err) {
      setError(err.message || `Failed to dislike post with ID ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    pagination,
    loading,
    error,
    fetchPosts,
    getPostById,
    createPost,
    likePost,
    dislikePost,
  };
};