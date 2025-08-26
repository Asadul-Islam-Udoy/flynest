import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: any;
  login: (data: { accessToken: string; user: any }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    return token && userData ? { token, ...JSON.parse(userData) } : null;
  });

  const login = (data: { accessToken: string; user: any }) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser({ token: data.accessToken, ...data.user });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
