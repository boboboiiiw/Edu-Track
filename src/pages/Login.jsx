import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    await login(
      values.email,
      values.password,
      () => {
        toast.success("Login berhasil!");
        navigate("/home");
      },
      (error) => {
        toast.error(error?.message || "Email atau password salah");
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#626F47] mb-6">
          Masuk ke EduTrack
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="kamu@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={authLoading}
            >
              {authLoading ? "Memuat..." : "Masuk"}
            </Button>
          </form>
        </Form>

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
