import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/admin/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import '/home/user/Documents/react/Shopping/src/styles/AdminPage.css';

function AdminPage() {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div className='full'>
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <h2>Add New Product</h2>
        <ProductForm onSubmit={addProduct} />
      </div>
    </div>
  );
}

export default AdminPage;