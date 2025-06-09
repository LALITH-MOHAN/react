import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated() ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? 
                <Dashboard /> : 
                <Navigate to="/login" replace state={{ from: '/dashboard' }} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;