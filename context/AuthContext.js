import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { router } from 'expo-router';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ App load hone par check karo user logged in hai ya nahi
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await authService.getToken();
      const userData = await authService.getCurrentUser();

      if (token && userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Login function
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Register function
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ✅ Update user data
  const updateUser = (newUserData) => {
    setUser((prev) => ({ ...prev, ...newUserData }));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};