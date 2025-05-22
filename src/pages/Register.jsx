import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    console.log("Pendaftaran:", { nama, nim, prodi, email, password });
    // TODO: handle real register logic here
  };

  return (
    <div className="flex my-6 justify-center items-center min-h-full">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl  font-bold text-center text-[#626F47] mb-6">
          Daftar EduTrack
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="Nama kamu"
            />
          </div>

          <div>
            <label
              htmlFor="nim"
              className="block text-sm font-medium text-gray-700"
            >
              NIM
            </label>
            <input
              id="nim"
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="123456789"
            />
          </div>

          <div>
            <label
              htmlFor="prodi"
              className="block text-sm font-medium text-gray-700"
            >
              Program Studi
            </label>
            <input
              id="prodi"
              type="text"
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              required
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="Teknik Informatika"
            />
          </div>

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
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
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
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full min-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A4B465]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#626F47] text-[#FEFAE0] hover:bg-[#4E5839] font-semibold py-2 rounded-md transition"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#626F47] font-semibold hover:underline"
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
