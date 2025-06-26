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
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [error, setError] = useState(null);

  if (!product || typeof product !== 'object') {
    return (
      <div className="product-card">
        <div className="product-error">Product data not available</div>
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const currentInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStockForUser = currentInCart >= product.stock;

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (adding || isOutOfStockForUser) return;
    setAdding(true);
    setError(null);
    
    try {
      const success = await addToCart(product, 1); // Explicitly pass quantity 1
      if (success) {
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }
    } catch (error) {
      setError(error.message);
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

  const getImageUrl = () => {
    if (!product.thumbnail) return 'https://placehold.co/600x400?text=No+Image';
    if (product.thumbnail.startsWith('http')) return product.thumbnail;
    return `http://localhost:3000${product.thumbnail}`;
  };

  if (isEditing) {
    return (
      <div className="product-form-container">
        <ProductForm 
          product={product} 
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={getImageUrl()} 
          alt={product.title || 'Untitled Product'} 
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=No+Image';
            e.target.className = 'product-image placeholder-image';
          }}
        />
      </div>
      <h3 className="product-title">{product.title || 'Untitled Product'}</h3>
      <p className="product-price">${formatPrice(product.price)}</p>
      <p className="product-stock">Stock: {product.stock || 0}</p>
      <p className="product-category">{product.category || 'Uncategorized'}</p>

      <div className="action-buttons">
        <button 
          className={`add-to-cart-btn ${clicked ? 'clicked' : ''}`} 
          onClick={handleAddToCart} 
          disabled={isOutOfStockForUser || adding}
        >
          {isOutOfStockForUser ? 'Out of Stock' : 
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
      </div>

      {error && <div className="error-message">{error}</div>}

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