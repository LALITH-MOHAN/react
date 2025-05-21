import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Mock admin login (hardcoded)
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser = { id: 1, name: "Admin", role: "admin" };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser)); // Store in localStorage
      return true;
    }

    // Mock customer login (check against localStorage)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser)); // Store in localStorage
      return true;
    }
    return false; // Login failed
  };

  const register = (name, email, password) => {
    const newUser = { id: Date.now(), name, email, password, role: "customer" };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...users, newUser])); // Store new user
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user'); // Clear stored user
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}