import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './admin/ProductForm';
import '/home/user/Documents/react/Shopping/src/styles/ProductCard.css';

function ProductCard({ product }) {
  const { user } = useAuth();
  const { deleteProduct, updateProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate(); //if not logged in navigate to login page if add to cart clicked
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [adding, setAdding] = useState(false); //to display adding..

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
    } finally {
      setAdding(false);
    }
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
      <div className="product-card edit-mode" id={`product-${product.id}`}>
        <ProductForm  product={product} onSubmit={handleSave} onCancel={handleCancel}/>
      </div>
    );
  }

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <img src={product.thumbnail} alt={product.title} className="product-image"/> {/*IMage of the Product*/}
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>

      <button className={`product-btn add-to-cart-btn ${clicked ? 'clicked' : ''}`} onClick={handleAddToCart} disabled={product.stock <= 0 || adding}>
        {product.stock <= 0 ? 'Out of Stock' : clicked ? 'Added!' :  adding ? 'Adding...' : 'Add to Cart'}
      </button>

      {user?.role === 'admin' && (
        <>
          <button className="product-btn delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="product-btn edit-btn" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default ProductCard;