import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');
    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setIsLoading(false);
  }, []);

  async function Login(credentials) {
    const response = await AuthService.loginTest(credentials);
    setUser(response.data);
    sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
    sessionStorage.setItem('@App:token', response.data.token);
  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
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
