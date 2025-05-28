import { Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { useAuth } from "@/hooks/useAuth"; // Mengimpor useAuth

const RedirectToHome = () => {
  const { isAuthenticated, loading } = useAuth(); // Mengambil isAuthenticated dan loading dari useAuth

  // Tampilkan indikator loading jika status autentikasi masih dimuat
  if (loading) {
    return <div>Loading authentication...</div>; // Atau spinner loading lainnya
  }

  // Jika sudah terautentikasi, redirect ke /home, jika tidak, tampilkan LandingPage
  return isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />;
};

export default RedirectToHome;