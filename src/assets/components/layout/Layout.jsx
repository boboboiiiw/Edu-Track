import Button from "../Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full">
        <div className="bg-[#626F47] px-10 h-16 text-[#FEFAE0] mx-auto flex flex-row justify-between items-center ">
          <h1 className="text-lg font-bold w-fit">Edu Track</h1>

          <nav className="space-x-4 flex items-center justify-between w-fit">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline text-[#FFCF50]"
                  : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline text-[#FFCF50]"
                  : "hover:underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline text-[#FFCF50]"
                  : "hover:underline"
              }
            >
              Contact
            </NavLink>
          </nav>

          <Button className={`${location.pathname === '/login' ? "invisible" : ""} `} variant="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-[#FEFAE0] text-[#626F47] w-full flex flex-col items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#A4B465] text-[#FEFAE0] text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
