import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storagedToken = sessionStorage.getItem('@App:token');
    if (storagedToken) {
      setToken(storagedToken);
    }
    setIsLoading(false);
  }, []);

  async function Login(credentials) {
    const response = await AuthService.login(credentials);
    setToken(response.token);
    sessionStorage.setItem('@App:token', response.token);
  }

  function Logout() {
    setToken(null);
    sessionStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(token),
        token,
        Authenticate: Login,
        Logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
