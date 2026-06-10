import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const UserAuthContext = createContext();
const AdminAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('user_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/api/auth/me');
          setUser(res.data.user);
        } catch (error) {
          console.error('Error fetching user', error);
          setToken(null);
          localStorage.removeItem('user_token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('user_token', res.data.token);
    }
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/api/auth/register', { name, email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('user_token', res.data.token);
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user_token');
  };

  return (
    <UserAuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (token) {
        try {
          const res = await api.get('/api/admin/auth/me');
          setAdmin(res.data.admin);
        } catch (error) {
          console.error('Error fetching admin', error);
          setToken(null);
          localStorage.removeItem('admin_token');
        }
      }
      setLoading(false);
    };
    fetchAdmin();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/api/admin/auth/login', { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setAdmin(res.data.admin);
      localStorage.setItem('admin_token', res.data.token);
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
export const useAdminAuth = () => useContext(AdminAuthContext);
