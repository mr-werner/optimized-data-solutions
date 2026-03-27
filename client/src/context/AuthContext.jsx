import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user on app start
  useEffect(() => {
    async function loadUser() {
      try {
        const data = await authService.getMe();
        setUser(data.user);
      } catch (err) {
        // Token invalid or expired
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // 🔑 Login
  const login = async (credentials) => {
    try {
      await authService.login(credentials); // token already stored
      const me = await authService.getMe();
      setUser(me.user);
    } catch (err) {
      throw err; // let UI handle error
    }
  };

  // 🆕 Register
  const register = async (info) => {
    try {
      await authService.register(info); // token already stored
      const me = await authService.getMe();
      setUser(me.user);
    } catch (err) {
      throw err;
    }
  };

  // 🚪 Logout
  const logout = () => {
    authService.logout(); // centralized
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔌 Hook
export const useAuth = () => useContext(AuthContext);