import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "@/lib/storage";

interface AuthUser {
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const auth = getFromLocalStorage<{ isAuthenticated: boolean; email: string; name: string }>(
      "littlejappy_customer_auth"
    );
    if (auth?.isAuthenticated) {
      setUser({ email: auth.email, name: auth.name });
    }
  }, []);

  const login = (email: string, name: string) => {
    const userData = { email, name };
    saveToLocalStorage("littlejappy_customer_auth", { isAuthenticated: true, ...userData });
    setUser(userData);
  };

  const logout = () => {
    removeFromLocalStorage("littlejappy_customer_auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
