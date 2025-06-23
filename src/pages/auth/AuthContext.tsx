import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // <- Add loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");

    if (token && email) {
      setUser({ email });
      setIsAuthenticated(true);
    }
    setLoading(false); 
  }, []);

  const login = async (email: string, password: string) => {
    if (email && password) {
      localStorage.setItem("authToken", "dummy-token");
      localStorage.setItem("userEmail", email);
      
      setUser({ email });
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid login credentials");
    }
  };

  const signup = async (email: string, password: string) => {
    if (email && password) {
      localStorage.setItem("authToken", "dummy-token");
      localStorage.setItem("userEmail", email);
      setUser({ email });
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid signup credentials");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
