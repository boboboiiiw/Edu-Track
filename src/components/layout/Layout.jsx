import { Button } from "@/components/ui/button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth-context";

const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full">
        <div className="bg-[#626F47] px-10 h-16 text-[#FEFAE0] flex justify-between items-center shadow-sm">
          <h1 className="text-lg font-bold tracking-wide">Edu Track</h1>

          <nav className="space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFCF50] font-semibold underline"
                  : "text-[#FEFAE0] hover:text-[#FFCF50]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFCF50] font-semibold underline"
                  : "text-[#FEFAE0] hover:text-[#FFCF50]"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFCF50] font-semibold underline"
                  : "text-[#FEFAE0] hover:text-[#FFCF50]"
              }
            >
              Contact
            </NavLink>
          </nav>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm italic text-[#FFCF50]">
                {user?.name}
              </span>
              <Button
                variant="secondary"
                className="bg-[#A4B465] text-[#FEFAE0] hover:bg-[#8CA15A]"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              className={`bg-[#FFCF50] text-[#626F47] hover:bg-[#f2c13d] ${
                location.pathname === "/login" ? "invisible" : ""
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
        <Separator />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full bg-[#FEFAE0] text-[#626F47] px-4 py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-[#A4B465] text-[#FEFAE0] text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} EduTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
