function ProductCard({ product, onAddToCart }) {
    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          width: '220px',
          borderRadius: '10px',
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <h4>{product.title}</h4>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    );
  }
  
  export default ProductCard;
  