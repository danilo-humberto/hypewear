import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientData, removeClientData, setClientData } from "@/utils/storage";
import { setupResponseInterceptor } from "@/api/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  token: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (authData: any) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedData = getClientData("client");
  const initialUser: User | null = storedData ? { ...storedData.client, token: storedData.token } : null;
  
  const [user, setUser] = useState<User | null>(initialUser);
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    removeClientData("client");
    navigate("/"); 
  };

  const loginUser = (authData: any) => {
    const token = authData.access_token;
    const client = authData.client;
    
    if (token && client) {
      const userData: User = { ...client, token };
      setUser(userData);
      setClientData("client", { token, client });
    }
  };
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    setupResponseInterceptor(logoutUser);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loginUser, 
        logoutUser, 
        isAuthenticated, 
        isAdmin 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};