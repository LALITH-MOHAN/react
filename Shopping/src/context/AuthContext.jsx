import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const register = (name, email, password) => {
    try {
      // Store credentials only (don't log in)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        return false;
      }
      
      // Add new user credentials
      localStorage.setItem('users', JSON.stringify([
        ...users, 
        { 
          id: Date.now(),
          name,
          email, 
          password,
          role: 'customer' 
        }
      ]));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const login = (email, password) => {
    // Mock admin login
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser = { id: 1, name: "Admin", role: "admin" };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }

    // Check regular users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Don't store password in user context
      const { password, ...userData } = user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}