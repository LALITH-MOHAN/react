import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/admin/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';

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
        <h2>Add New Product Details</h2>
        <ProductForm onSubmit={addProduct} />
      </div>
    </div>
  );
}

export default AdminPage;