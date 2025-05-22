import { useState } from "react";
import { useAuth } from "@/hooks/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // password lama
    newPassword: "", // password baru
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (formData.password && formData.password !== user.password) {
      return setMessage("❌ Password lama salah.");
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      return setMessage("❌ Password baru minimal 6 karakter.");
    }

    // Update user data
    login({
      ...user,
      name: formData.name,
      email: formData.email,
      password: formData.newPassword || user.password, // ganti jika ada password baru
    });

    setMessage("✅ Profil berhasil diperbarui.");
    setFormData((prev) => ({ ...prev, password: "", newPassword: "" }));
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profil Saya</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nama Lengkap
              </label>
              <Input
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama kamu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <Input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-gray-100 cursor-not-allowed text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email tidak dapat diubah.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Peran</label>
              <p className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
                {user?.role || "Tidak diketahui"}
              </p>
            </div>

            <Separator />

            <div>
              <label className="block text-sm font-medium mb-1">
                Password Lama
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password Baru
              </label>
              <Input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">
                Biarkan kosong jika tidak ingin mengubah password.
              </p>
            </div>

            {message && (
              <p className="text-sm text-center mt-2 text-gray-700">
                {message}
              </p>
            )}

            <Button type="submit" className="w-full">
              Simpan Perubahan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
