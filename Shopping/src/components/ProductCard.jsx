function ProductCard({ product }) {
    return (
      <div style={{ border: "1px solid black", padding: 20, margin: 10 }}>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <img src={product.thumbnail} alt={product.title} width={150} />
      </div>
    );
  }

  export default ProductCard;
  