import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth-context";
import LandingPage from "@/pages/LandingPage";

const RedirectToHome = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />;
};

export default RedirectToHome;
