import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeCard from './EmployeeCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>  /*this will be displayed if no employees*/
      ) : (
        <div>
          {employees.map(emp => (
            <ErrorBoundary key={emp.id} FallbackComponent={ErrorFallback}>
              <EmployeeCard employee={emp} /> {/*IT DISPLAYS THE EACH EMPLOYEE DETAILS*/}    
            </ErrorBoundary>
          ))}
        </div>
      ) }
    </div>
  );
}

export default EmployeeList;
