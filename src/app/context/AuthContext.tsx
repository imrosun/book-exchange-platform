import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie } from '../../lib/utils'; 
import { useRouter } from 'next/navigation'; 

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();  

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); 
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Clear the token cookie
    document.cookie = "token=; Max-Age=0; path=/";
    setIsLoggedIn(false);
    router.push("/home");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
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
