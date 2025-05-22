import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './admin/ProductForm';

function ProductCard({ product }) {
  const { user } = useAuth();
  const { deleteProduct, updateProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({ ...product, quantity: 1 });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(product.id);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = (updatedProduct) => {
    updateProduct(product.id, updatedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px' }}>
        <ProductForm 
          product={product}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px' }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px' }} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>

      {user?.role === 'admin' && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default ProductCard;