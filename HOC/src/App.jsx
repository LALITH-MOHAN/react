import React from 'react';
import MouseTracker from './components/mousetracker';

function App() {
  return (
    <div>
      <h2>Render Props</h2>
      <MouseTracker
        render={({ x, y }) => (
          <h3>
            Mouse Position: ({x}, {y})
          </h3>
        )}
      />
    </div>
  );
}

export default App;
