import { useState } from 'react';
import { postData } from '../api';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData(`${API}/register`, form);
      if (res.error) {
        setMsg(res.error);
      } else {
        setMsg('Registered successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      setMsg('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            placeholder="Name" 
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required 
          />
        </div>
        
        <button type="submit" className="submit-btn">Register</button>
        {msg && <p className="message">{msg}</p>}
      </form>
    </div>
  );
}