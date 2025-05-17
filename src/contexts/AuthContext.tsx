
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user types
export type UserRole = "artist" | "viewer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  artistType?: string;
  followers: number;
  following: number;
  collaborations: number;
  works: number;
}

// Mock user data for demo purposes
const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "Amara Okafor",
    email: "amara@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Visual artist exploring African cultural identity through mixed media.",
    role: "artist",
    artistType: "Visual Art",
    followers: 245,
    following: 87,
    collaborations: 12,
    works: 34
  },
  {
    id: "2",
    name: "Kofi Mensah",
    email: "kofi@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Music producer blending traditional West African sounds with modern beats.",
    role: "artist",
    artistType: "Music",
    followers: 1245,
    following: 214,
    collaborations: 32,
    works: 47
  },
  {
    id: "3",
    name: "Zainab Ahmed",
    email: "zainab@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
    bio: "Fashion designer creating modern African-inspired pieces.",
    role: "artist",
    artistType: "Fashion Design",
    followers: 873,
    following: 129,
    collaborations: 18,
    works: 42
  }
];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole, artistType?: string) => Promise<void>;
  logout: () => void;
  allUsers: User[]; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allUsers] = useState<User[]>(DEMO_USERS); // For demo purposes
  
  // Check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem("crib_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call
      setTimeout(() => {
        const foundUser = DEMO_USERS.find(u => u.email === email);
        if (foundUser && password === "password") { // Simple password for demo
          setUser(foundUser);
          localStorage.setItem("crib_user", JSON.stringify(foundUser));
          
          // Redirect user to dashboard - use window.location for a full reload
          window.location.href = "/dashboard";
        } else {
          throw new Error("Invalid credentials");
        }
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole, artistType?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call
      setTimeout(() => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role,
          artistType,
          followers: 0,
          following: 0,
          collaborations: 0,
          works: 0
        };
        setUser(newUser);
        localStorage.setItem("crib_user", JSON.stringify(newUser));
        
        // Redirect user to dashboard - use window.location for a full reload
        window.location.href = "/dashboard";
        
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crib_user");
    
    // Redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout, allUsers }}>
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
