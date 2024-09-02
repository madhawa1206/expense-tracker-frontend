import { useState } from 'react';
import { api } from '../utils/api';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        setIsAuthenticated(true);
      } else if (response.data.error) {
        return response;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, login, logout };
};
