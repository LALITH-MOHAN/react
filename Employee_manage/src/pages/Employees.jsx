import { lazy, Suspense, useState } from 'react';
import './Employee.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
//Import dynamivally the component only when needed
const EmployeeList = lazy(() => import('../components/EmployeeList'));
const EmployeeForm = lazy(() => import('../components/EmployeeForm'));

function Employees() {
  const [activeComponent, setActiveComponent] = useState(null); // 'form' or 'list'

  return (
    <div>
      <h1>Manage Employees</h1>
      <div className="button-group">
        <button onClick={() => setActiveComponent('form')}>Load Employee Form</button>
        <button onClick={() => setActiveComponent('list')}>Load Employee List</button>
      </div>

      {/*ADDED ERROR BOUNDARIES FOR THE COMPONENT SO THAT IT WILL AFFECT THE FLOW OF THE APP*/}
      <div className="component-display">
        {activeComponent === 'form' && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<p>Loading Employee Form...</p>}>
              <EmployeeForm />
            </Suspense>
          </ErrorBoundary>
        )}

        {activeComponent === 'list' && (
          <ErrorBoundary FallbackComponent={ErrorFallback}> 
            <Suspense fallback={<p>Loading Employee List...</p>}>
              <EmployeeList />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default Employees;
