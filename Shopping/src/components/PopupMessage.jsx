import React from 'react';
import '../styles/PopupMessage.css';

function PopupMessage({ message, onClose, type = 'success', onConfirm }) {
  return (
    <div className="popup-overlay">
      <div className={`popup-message ${type}`}>
        <p>{message}</p>
        <div className="popup-buttons">
          {type === 'confirm' ? (
            <>
              <button className="confirm-button" onClick={onConfirm}>Confirm</button>
              <button className="cancel-button" onClick={onClose}>Cancel</button>
            </>
          ) : ( <button onClick={onClose}>OK</button>)}
        </div>
      </div>
    </div>
  );
}

export default PopupMessage;