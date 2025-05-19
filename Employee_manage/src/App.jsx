import { useState } from 'react';
import AppRouter from './AppRouter';
import { EmployeeProvider } from './context/EmployeeContext';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeProvider>
         <AppRouter />
      </EmployeeProvider>
    </>
  );
}

export default App;
