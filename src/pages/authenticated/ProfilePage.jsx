import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const ProfilePage = () => {
  const { profile, loading, updateProfile, changePassword } = useProfile();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({ ...prev, name: profile.name }));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    updateProfile({ name: formData.name });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!formData.password || !formData.newPassword) return;
    if (formData.newPassword.length < 6) {
      return toast.error("Password baru minimal 6 karakter.");
    }
    changePassword(formData.password, formData.newPassword);
    setFormData((prev) => ({ ...prev, password: "", newPassword: "" }));
  };

  if (loading) return <p className="text-center">Memuat profil...</p>;
  if (!profile) return <p className="text-center text-red-500">Profil tidak tersedia.</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profil Saya</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-6">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama kamu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={profile.email} disabled className="bg-gray-100 text-gray-500" />
              <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Peran</label>
              <p className="text-sm bg-gray-100 px-3 py-2 rounded-md">{profile.role}</p>
            </div>
            <Button type="submit" className="w-full mt-4">Simpan Perubahan</Button>
          </form>

          <Separator />

          <form onSubmit={handleChangePassword} className="space-y-4">
            <h3 className="font-semibold text-lg">Ubah Password</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Password Lama</label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password Baru</label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter.</p>
            </div>
            <Button type="submit" className="w-full">Ubah Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
