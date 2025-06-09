import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, clearToken } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>{' | '}
      {isAuthenticated() ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>{' | '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
