import { apiRequest } from "@/components/utils/api";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔁 Pemulihan state dari localStorage saat reload
  useEffect(() => {
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem("token");
      const cachedUser = localStorage.getItem("user");

      console.log("Token on load:", storedToken);
      console.log("Cached user on load:", cachedUser);

      if (storedToken) {
        try {
          const userData = await apiRequest("/me", { method: "GET" });
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData)); // update cache
        } catch (error) {
          console.error("Gagal mengambil user dari token:", error);

          // fallback dari cache jika /me gagal tapi user tersimpan
          if (cachedUser) {
            try {
              const parsed = JSON.parse(cachedUser);
              setUser(parsed);
              setIsAuthenticated(true);
              console.warn("Menggunakan data user dari cache.");
            } catch (e) {
              localStorage.removeItem("user");
            }
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []);

  const login = useCallback(async (email, password, onSuccess, onError) => {
    setLoading(true);
    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      if (onSuccess) onSuccess(data);
      return data;
    } catch (error) {
      if (onError) onError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password, prodi, nim) => {
    setLoading(true);
    try {
      const data = await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, prodi, nim }),
      });
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    return await apiRequest("/change-password", {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  }, []);

  const updateProfile = useCallback(async (fieldsToUpdate) => {
    const data = await apiRequest("/me", {
      method: "PATCH",
      body: JSON.stringify(fieldsToUpdate),
    });
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  }, []);

  const getMyProfile = useCallback(async () => {
    const data = await apiRequest("/me", { method: "GET" });
    return data;
  }, []);

  const authValue = React.useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      changePassword,
      updateProfile,
      getMyProfile,
    }),
    [
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      changePassword,
      updateProfile,
      getMyProfile,
    ]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
