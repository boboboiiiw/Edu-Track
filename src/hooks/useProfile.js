import { useEffect, useState } from "react";
import { apiRequest } from "@/components/utils/api";
import { toast } from "sonner";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil profil saat mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiRequest("/me");
        setProfile(res);
      } catch {
        toast.error("Gagal memuat profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Update nama, prodi, atau NIM
  const updateProfile = async (updates) => {
    try {
      const res = await apiRequest("/me", {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
      setProfile(res.user);
      toast.success("✅ Profil berhasil diperbarui.");
    } catch (err) {
      toast.error(err?.error || "Gagal memperbarui profil.");
    }
  };

  // Ubah password
  const changePassword = async (old_password, new_password) => {
    try {
      const res = await apiRequest("/change-password", {
        method: "POST",
        body: JSON.stringify({ old_password, new_password }),
      });
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.error || "Gagal mengubah password.");
    }
  };

  return { profile, loading, updateProfile, changePassword };
}
