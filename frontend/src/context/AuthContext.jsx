"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "@/utils/storage";
import { getCurrentUser } from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedToken = getToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      const userData = await getCurrentUser();

      setUser(userData);
    } catch (error) {
      console.error(error);

      removeToken();
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, jwtToken) => {
    saveToken(jwtToken);

    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    removeToken();

    setUser(null);
    setToken(null);
    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}