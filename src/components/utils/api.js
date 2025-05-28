import { API_BASE_URL } from "@/config/api";

// Fungsi untuk mendapatkan token dari localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Fungsi utilitas untuk membuat permintaan API generik.
 * @param {string} endpoint - Jalur endpoint API (misal: '/posts', '/login').
 * @param {object} options - Opsi untuk permintaan fetch (method, headers, body, dll.).
 * @returns {Promise<object>} - Mengembalikan data JSON dari respons atau melempar Error.
 */
export const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    const config = {
      ...options,
      headers,
      credentials: "include", // 🟢 penting untuk kirim cookie, token, dsb
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! Status: ${response.status}`
        );
      }
  
      if (response.status === 204) {
        return {};
      }
  
      return await response.json();
    } catch (error) {
      console.error(`API Request Error to ${endpoint}:`, error);
      throw error;
    }
  };
  