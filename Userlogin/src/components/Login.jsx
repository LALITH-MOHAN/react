import { useState } from 'react';
import { postData } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken } from '../utils/auth';
import { API } from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await postData(`${API}/login`, form);
      if (res.error) {
        setError(res.error);
      } else {
        setToken(res.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}