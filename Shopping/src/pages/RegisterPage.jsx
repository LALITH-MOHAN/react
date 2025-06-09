import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PopupMessage from '../components/PopupMessage';
import '/home/user/Documents/react/Shopping/src/styles/ResgisterPage.css';
function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await register(name, email, password);
    if (success) {
      setPopupMessage('Registration successful!');
      setShowPopup(true);
    } else {
      setError('Registration failed. Email may already exist.');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/');
  };

  return (
    <div className='full'>
      <div className="register-container">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Email:</label>
            <input  
              type="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password"   
              value={password}   
              onChange={(e) => setPassword(e.target.value)}   
              required
            />
          </div>
          <button type="submit">Register</button>      
        </form>
      </div>

      {showPopup && (
        <PopupMessage 
          message={popupMessage} 
          onClose={handlePopupClose} 
          type="success"
        />
      )}
    </div>
  );
}

export default RegisterPage;