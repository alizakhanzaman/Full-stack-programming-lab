"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("crm_token");
    const userData = localStorage.getItem("crm_user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });

    // Save token in browser's localStorage (persists even after closing tab)
    localStorage.setItem("crm_token", data.token);
    localStorage.setItem("crm_user", JSON.stringify({ name: data.name, email: data.email }));
    setUser({ name: data.name, email: data.email });
    router.push("/dashboard");  // redirect to dashboard
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/auth/register", { name, email, password });
    localStorage.setItem("crm_token", data.token);
    localStorage.setItem("crm_user", JSON.stringify({ name: data.name, email: data.email }));
    setUser({ name: data.name, email: data.email });
    router.push("/dashboard");
  };


  const logout = () => {
    localStorage.removeItem("crm_token"); // Remove token from localStorage to log out
    localStorage.removeItem("crm_user");  // delete user info
    setUser(null);
    router.push("/login"); // go back to login page
  };
  //No token = no access to protected routes

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);