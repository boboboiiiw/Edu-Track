import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiRequest } from "@/components/utils/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const AddPostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    references: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Judul dan konten wajib diisi.");
      return;
    }

    const refArray = form.references
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r);

    setLoading(true);
    try {
      await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          references: refArray,
        }),
      });

      toast.success("Rangkuman berhasil ditambahkan.");
      navigate("/myposts"); // arahkan ke halaman 'rangkumanku'
    } catch (err) {
      toast.error("Gagal menambahkan rangkuman.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📝 Tambah Rangkuman</h1>

      <Card>
        <CardContent className="space-y-5 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Masukkan judul rangkuman"
              />
            </div>

            <div>
              <Label htmlFor="content">Konten</Label>
              <Textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={6}
                placeholder="Tulis isi rangkuman di sini..."
              />
            </div>

            <div>
              <Label htmlFor="references">Referensi (opsional)</Label>
              <Input
                id="references"
                name="references"
                value={form.references}
                onChange={handleChange}
                placeholder="Pisahkan dengan koma, contoh: https://a.com, https://b.com"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Tambah Rangkuman"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPostPage;
