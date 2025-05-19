import { lazy, Suspense } from 'react';
import './Employee.css'
const EmployeeList = lazy(() => import('../components/EmployeeList'));
import { useState } from 'react';

function Employees() {
  const handleLoadList = () => {
    setShowList(true);
  };

  const [showList, setShowList] = useState(false);

  return (
    <div>
      <h1>Manage Employees</h1>
      {!showList && (
        <button onClick={handleLoadList}>
          Load Employee List
        </button>
      )}

      {showList && (
        <Suspense fallback={<p>Loading Employee List...</p>}>
          <EmployeeList />
        </Suspense>
      )}
    </div>
  );
}

export default Employees;
