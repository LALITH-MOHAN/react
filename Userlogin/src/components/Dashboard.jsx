import useSWR from 'swr';
import { fetcher, deleteData } from '../api';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  
  if (!isAuthenticated()) {
    navigate('/login', { replace: true });
    return null;
  }

  const { data, error, mutate } = useSWR(`${API}/users`, fetcher);

  const handleDelete = async (id) => {
    try {
      await deleteData(`${API}/users/${id}`);
      mutate();
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <div>Error loading users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}