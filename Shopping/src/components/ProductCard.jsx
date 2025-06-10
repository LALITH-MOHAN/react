import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './admin/ProductForm';
import PopupMessage from './PopupMessage';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { user } = useAuth();
  const { deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  if (!product || typeof product !== 'object') {
    return (
      <div className="product-card">
        <div className="product-error">Product data not available</div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (adding) return;
    setAdding(true);
    
    try {
      const success = await addToCart(product);
      if (success) {
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = () => setShowDeletePopup(true);

  const confirmDelete = async () => {
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setShowDeletePopup(false);
  };

  const formatPrice = (price) => {
    try {
      const numericPrice = typeof price === 'string' 
        ? parseFloat(price) 
        : Number(price);
      return isNaN(numericPrice) ? '0.00' : numericPrice.toFixed(2);
    } catch {
      return '0.00';
    }
  };

  if (isEditing) {
    return (
      <div className="product-card edit-mode">
        <ProductForm 
          product={product} 
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="product-card">
      <img 
        src={product.thumbnail || 'https://placehold.co/300x300?text=No+Image'} 
        alt={product.title || 'Untitled Product'} 
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://placehold.co/300x300?text=No+Image';
        }}
      />
      <h3 className="product-title">{product.title || 'Untitled Product'}</h3>
      <p className="product-price">${formatPrice(product.price)}</p>
      <p className="product-stock">Stock: {product.stock || 0}</p>
      <p className="product-category">{product.category || 'Uncategorized'}</p>

      <button 
        className={`add-to-cart-btn ${clicked ? 'clicked' : ''}`} 
        onClick={handleAddToCart} 
        disabled={(product.stock || 0) <= 0 || adding}
      >
        {(product.stock || 0) <= 0 ? 'Out of Stock' : 
         clicked ? 'Added!' : 
         adding ? 'Adding...' : 'Add to Cart'}
      </button>

      {user?.role === 'admin' && (
        <div className="admin-actions">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {showDeletePopup && (
        <PopupMessage 
          message="Are you sure you want to delete this product?"
          onClose={() => setShowDeletePopup(false)}
          onConfirm={confirmDelete}
          type="confirm"
        />
      )}
    </div>
  );
}

export default ProductCard;