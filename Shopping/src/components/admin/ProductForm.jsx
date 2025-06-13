import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import '/home/user/Documents/react/Shopping/src/styles/ProductForm.css';

function ProductForm({ product = null, onCancel }) {
  const { addProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    description: product?.description || '',
    thumbnail: product?.thumbnail || '' // This will store path like "/products/image.jpg"
  });
  const [status, setStatus] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('processing');
    
    try {
      let success;
      if (product) {
        success = await updateProduct(product.id, formData);
      } else {
        success = await addProduct(formData);
      }
      
      if (success) {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Generate clean filename based on product title
      const cleanTitle = formData.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const fileName = `${cleanTitle || 'product'}_${Date.now()}.${file.name.split('.').pop()}`;
      setFormData(prev => ({ 
        ...prev, 
        thumbnail: `/products/${fileName}` 
      }));
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Title:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          min="0" 
          step="0.01" 
          required 
        />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input 
          type="number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleChange} 
          min="0" 
          required 
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <input 
          type="text" 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Product Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        <small className="image-help-text">
          After selecting, manually add the image to <code>/public/products/</code> as: 
          {formData.thumbnail ? ` ${formData.thumbnail.split('/').pop()}` : ' [filename]'}
        </small>
        {formData.thumbnail && (
          <div className="image-preview">
            <img 
              src={formData.thumbnail.startsWith('http') ? formData.thumbnail : 
                   `http://localhost:3000${formData.thumbnail}`} 
              alt="Preview" 
            />
          </div>
        )}
      </div>

      <div className="form-buttons">
        <button 
          type="submit" 
          disabled={status === 'processing'}
          className={status === 'success' ? 'success' : ''}
        >
          {status === 'processing' ? 'Processing...' : 
           status === 'success' ? 'Success!' : 
           product ? 'Update Product' : 'Add Product'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
      {status === 'error' && (
        <p className="error-message">Operation failed. Please try again.</p>
      )}
    </form>
  );
}

export default ProductForm;