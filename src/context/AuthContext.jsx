import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('ajaysinh_admin_token');
      const storedUser = localStorage.getItem('ajaysinh_admin_user');

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setAdmin(JSON.parse(storedUser));
          } catch (e) {
            console.error('Failed to parse cached admin user', e);
          }
        }

        // Verify token against backend
        try {
          const profileData = await authService.getProfile();
          if (profileData && profileData.admin) {
            setAdmin(profileData.admin);
            localStorage.setItem('ajaysinh_admin_user', JSON.stringify(profileData.admin));
          }
        } catch (error) {
          console.warn('Session verification failed, logging out.');
          localStorage.removeItem('ajaysinh_admin_token');
          localStorage.removeItem('ajaysinh_admin_user');
          setAdmin(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data && data.token) {
      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('ajaysinh_admin_token', data.token);
      localStorage.setItem('ajaysinh_admin_user', JSON.stringify(data.admin));
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // Ignore logout backend errors, clear locally anyway
    } finally {
      localStorage.removeItem('ajaysinh_admin_token');
      localStorage.removeItem('ajaysinh_admin_user');
      setAdmin(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: Boolean(token && admin),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
