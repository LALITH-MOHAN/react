// src/pages/AdminPage.jsx
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/admin/ProductForm';  // Updated import path
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Add New Product</h2>
      <ProductForm onSubmit={addProduct} />
    </div>
  );
}

export default AdminPage;