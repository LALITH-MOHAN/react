import { useState, useContext,Fragment} from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeForm.css';
function EmployeeForm() {
  // Local state for the form inputs
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  // Get the addEmployee function from context
  const { addEmployee } = useContext(EmployeeContext);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    if (!name || !position) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new employee object with a unique ID
    const newEmployee = {
      id: Date.now(), // simple unique ID using timestamp
      name,
      position,
    };

    // Add employee via context function
    addEmployee(newEmployee);

    // Reset form inputs
    setName('');
    setPosition('');
  };

  return (
    <Fragment> 
    <h2>ADD NEW EMPLOYEE DETAILS</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter employee name"
        />
      </div>

      <div>
        <label>Position: </label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Enter position"
        />
      </div>

      <button type="submit">Add Employee</button>
    </form>
    </Fragment>
  );
}

export default EmployeeForm;
