import React, { useState } from "react";
import axios from "axios";
import { AuthContext, type AuthUser } from "./auth-context";

const API_URL = import.meta.env.VITE_API_URL;

// Reads saved auth from localStorage once, synchronously, before first render
const getInitialAuth = (): { user: AuthUser | null; token: string | null } => {
  const savedToken = localStorage.getItem("kea_token");
  const savedUser = localStorage.getItem("kea_user");

  if (savedToken && savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser) as AuthUser;
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      return { user: parsedUser, token: savedToken };
    } catch {
      localStorage.removeItem("kea_token");
      localStorage.removeItem("kea_user");
    }
  }
  return { user: null, token: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ user, token }, setAuth] = useState(getInitialAuth);
  const [isLoading] = useState(false);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const data = res.data;

    const newToken: string = data.token ?? data.data?.token;
    const rawUser = data.user ?? data.data?.user ?? data.data;

    if (!newToken) throw new Error("Server se token nahi mila. Admin se rabta karein.");

    const authUser: AuthUser = {
      id: rawUser?._id ?? rawUser?.id ?? "1",
      name: rawUser?.name ?? rawUser?.username ?? email.split("@")[0],
      email: rawUser?.email ?? email,
      role: rawUser?.role ?? "Admin",
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    localStorage.setItem("kea_token", newToken);
    localStorage.setItem("kea_user", JSON.stringify(authUser));
    setAuth({ user: authUser, token: newToken });
  };

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("kea_token");
    localStorage.removeItem("kea_user");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};