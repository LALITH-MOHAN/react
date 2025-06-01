import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUsers } from '../slice/userSlice';

function Home() {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users added yet.</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} -{user.age}
              <button onClick={() => dispatch(deleteUsers(index))}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
