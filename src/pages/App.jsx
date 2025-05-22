import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/authenticated/Index";
import PostListPage from "@/pages/authenticated/PostListPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
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
      </Routes>
    </Layout>
  );
}
