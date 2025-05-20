//fallback component whenever an error raises in the Components
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert" style={{ color: 'red' }}>
        <h2>Something went wrong.</h2>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  
  export default ErrorFallback;
  