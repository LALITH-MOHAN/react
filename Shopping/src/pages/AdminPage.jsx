import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Extra protection (though PrivateRoute already handles this)
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Product Management</h3>
          <p>Add, edit, or remove products</p>
        </div>
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Order Management</h3>
          <p>View and process orders</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;