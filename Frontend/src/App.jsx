import { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div>
      <h1>User Manager</h1>
      <UserForm editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList onEdit={setEditingUser} />
    </div>
  );
}
