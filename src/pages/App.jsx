import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/authenticated/Index";
import PostListPage from "@/pages/authenticated/PostListPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ProfilePage from "./authenticated/ProfilePage";
import MyPostsPage from "./authenticated/MyPostsPage";
import RecommendedPostsPage from "./authenticated/RecommendedPostsPage";
import RedirectToHome from "@/routes/RedirectToHome";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RedirectToHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/listPage"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <PostListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <MyPostsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommended"
          element={
            <ProtectedRoute>
              <RecommendedPostsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}
