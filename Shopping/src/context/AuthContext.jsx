import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id: 1, name: "John", role: "customer" }

  // Mock login function (replace with actual API call later)
  const login = (email, password) => {
    // Hardcoded admin for demo (use API in real app)
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ id: 1, name: "Admin", role: "admin" });
      return true;
    } else {
      // Mock customer login
      setUser({ id: 2, name: "Customer", role: "customer" });
      return true;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}