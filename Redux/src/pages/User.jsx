import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../slice/userSlice';

function User() {
  const dispatch = useDispatch();
  const [formIn, setFormIn] = useState({ name: "" });

  const handleChange = (e) => {
    const{name,value}=e.target;
    setFormIn((prev)=>({...prev,[name]:value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIn.name.trim()&&formIn.name.trim()) {
      dispatch(setUsers({name:formIn.name,age:formIn.age}));
      setFormIn({ name: "" ,age:""});
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' value={formIn.name} onChange={handleChange} placeholder='Enter name'/>
        <br />
        <input type='age' name='age' value={formIn.age} onChange={handleChange} />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default User;
