import React from 'react';
import '/home/user/Documents/react/Shopping/src/styles/PopupMessage.css';

function PopupMessage({ message, onClose, type = 'success' }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-message ${type}`}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default PopupMessage;