import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { AuthContextType, AuthenticatedUser } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = localStorage.getItem("user");
    const session = sessionStorage.getItem("user");

    if (local) setUser(JSON.parse(local));
    else if (session) setUser(JSON.parse(session));

    setLoading(false);
  }, []);

  const login = (userCredenrials: AuthenticatedUser, remember: boolean) => {
    setUser(userCredenrials);

    if (remember) {
      localStorage.setItem("user", JSON.stringify(userCredenrials));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userCredenrials));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
