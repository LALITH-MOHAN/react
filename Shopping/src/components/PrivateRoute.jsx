import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  
  return children;
}

export default PrivateRoute;