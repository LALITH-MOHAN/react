import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // No user? Redirect to login
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />; // Wrong role? Redirect home

  return children; // Allow access
}

export default PrivateRoute;