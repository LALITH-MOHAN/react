import { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';

function EmployeeCard({ employee }) {
  const { removeEmployee } = useContext(EmployeeContext);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      removeEmployee(employee.id);
    }
  };

  return (
     <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',border: '1px solid #ccc',marginBottom: '8px',borderRadius: '4px',}}>
      <div>
        <h3>NAME: {employee.name}</h3>
        <p>POSITION: {employee.position}</p>
      </div>
      <div>
        <button onClick={handleDelete} style={{ color: 'red' }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
