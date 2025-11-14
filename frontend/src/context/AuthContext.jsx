import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    api.setToken(res.data.token);
    setUser(res.data.user);
  }

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload);
    api.setToken(res.data.token);
    setUser(res.data.user);
  }

  const logout = () => {
    api.setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext); }
