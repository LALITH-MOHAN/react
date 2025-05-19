import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.name} - {emp.position}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
