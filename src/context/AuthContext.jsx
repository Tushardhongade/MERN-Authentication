import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // FIX: Added /api to baseURL and removed from individual routes
  const api = axios.create({
    baseURL: "https://mern-authentication-backend-two.vercel.app",
  });

  // Add request interceptor for debugging
  api.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method} request to: ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor to log errors
  api.interceptors.response.use(
    (response) => {
      console.log("Response received:", response.status);
      return response;
    },
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
      console.log("Sending registration request to:", api.defaults.baseURL);
      // FIX: Removed /api from route since it's in baseURL
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
      console.log("Sending login request to:", api.defaults.baseURL);
      // FIX: Removed /api from route since it's in baseURL
      const res = await api.post("/auth/login", userData);
      const { token, user } = res.data;
      setAuthToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
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
        try {
          // FIX: Removed /api from route since it's in baseURL
          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch (error) {
          console.error("Load user error:", error);
          localStorage.removeItem("token");
        }
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
