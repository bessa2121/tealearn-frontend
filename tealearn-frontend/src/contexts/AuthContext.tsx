import {
  createContext,
  useEffect,
  useState,
} from "react";

import { storage } from "@/utils/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      storage.getToken();

    setIsAuthenticated(
      !!token
    );

    setLoading(false);
  }, []);

  function login(
    token: string
  ) {
    storage.setToken(token);

    setIsAuthenticated(
      true
    );
  }

  function logout() {
    storage.removeToken();

    setIsAuthenticated(
      false
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}