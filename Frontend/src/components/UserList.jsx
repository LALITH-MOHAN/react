import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function UserList({ onEdit }) {
  const { data: users, error, isLoading, mutate } = useSWR('http://localhost:5000/api/users', fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}{' '}
          <button onClick={() => onEdit(user)}>Edit</button>{' '}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
