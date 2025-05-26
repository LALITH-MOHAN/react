import React from 'react';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px',border: '1px solid #ff6b6b',borderRadius: '4px',backgroundColor: '#ffe3e3',color: '#ff0000'}}>
      <h3>Something went wrong:</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}
     style={{
          padding: '8px 16px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallback;