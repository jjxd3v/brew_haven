import React, { useEffect, useState, createContext, useContext } from 'react';
import type { User } from '../types';
import * as api from '../services/api';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const loggedIn = await api.login(email, password);
    setUser(loggedIn);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await api.register(name, email, password);
      setUser(newUser);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    api.logout().catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
