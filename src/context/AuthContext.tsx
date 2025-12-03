import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { BACKEND_URL } from "../config";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user + token from localStorage on first render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "Login failed");
    }

    const data = await res.json();
    // data should look like: { token, user: { id, name, email, avatar? } }

    // If your frontend User type has different fields (bio, photoUrl, etc),
    // you can map here.
    const mappedUser: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      // optional mappings if you have these fields in your type
      bio: data.user.bio ?? "Fashion explorer",
      photoUrl: data.user.avatar?.url ?? undefined,
    };

    setToken(data.token);
    setUser(mappedUser);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(mappedUser));
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || "Registration failed");
    }

    // After successful registration, you can auto-login:
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
