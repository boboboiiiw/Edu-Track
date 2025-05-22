import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth-context";

const Login = () => {
  const { login } = useAuth(); // ✅ gunakan context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🎭 Simulasi validasi login dummy
    const mockUser = {
      name: "Boy",
      email,
      role: email.includes("dosen") ? "Dosen" : "Mahasiswa",
    };

    login(mockUser); // ⬅️ update context dan simpan ke localStorage
    navigate("/home"); // ⬅️ arahkan ke halaman setelah login
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#626F47] mb-6">
          Masuk ke EduTrack
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="kamu@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#626F47] text-[#FEFAE0] hover:bg-[#4E5839] font-semibold py-2 rounded-md transition"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#626F47] font-semibold hover:underline"
          >
            Daftar
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
