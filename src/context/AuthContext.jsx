import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Add response interceptor to log errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.status, error.response?.data);
      return Promise.reject(error);
    }
  );

  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["x-auth-token"] = token;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["x-auth-token"];
      localStorage.removeItem("token");
    }
  };

  const register = async (userData) => {
    try {
      console.log("Sending registration request:", userData);
      const res = await api.post("/auth/register", userData);
      console.log("Registration response:", res.data);

      const { token, user } = res.data;
      setAuthToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Check if server is running.",
      };
    }
  };

  const login = async (userData) => {
    try {
      const res = await api.post("/auth/login", userData);
      const { token, user } = res.data;
      setAuthToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        // For now, we'll just set a mock user since we're using mock auth
        setUser({ id: "12345", name: "Test User", email: "test@example.com" });
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
