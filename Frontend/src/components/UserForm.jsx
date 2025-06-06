import { useState, useEffect } from 'react';
import { mutate } from 'swr';

export default function UserForm({ editingUser, setEditingUser }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingUser) setName(editingUser.name);
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingUser
      ? `http://localhost:5000/api/users/${editingUser.id}`
      : 'http://localhost:5000/api/users';

    const method = editingUser ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    setName('');
    setEditingUser(null);
    mutate('http://localhost:5000/api/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter user name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
    </form>
  );
}
