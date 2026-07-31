import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Saved auth restore on page reload
    const savedToken = localStorage.getItem("kea_token");
    const savedUser = localStorage.getItem("kea_user");
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Set default axios auth header
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      } catch {
        localStorage.removeItem("kea_token");
        localStorage.removeItem("kea_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Real backend API call → /api/auth/login (proxied to localhost:5000)
    const res = await axios.post("/api/auth/login", { email, password });
    const data = res.data;

    // Handle both { token, user } and { data: { token, user } } shapes
    const token: string = data.token ?? data.data?.token;
    const rawUser = data.user ?? data.data?.user ?? data.data;

    if (!token) throw new Error("Server se token nahi mila. Admin se rabta karein.");

    const authUser: AuthUser = {
      id:    rawUser?._id    ?? rawUser?.id    ?? "1",
      name:  rawUser?.name   ?? rawUser?.username ?? email.split("@")[0],
      email: rawUser?.email  ?? email,
      role:  rawUser?.role   ?? "Admin",
    };

    setUser(authUser);
    setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("kea_token", token);
    localStorage.setItem("kea_user", JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("kea_token");
    localStorage.removeItem("kea_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
