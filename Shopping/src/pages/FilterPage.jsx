import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductContext';
import '../styles/FilterPage.css';

function FilterPage() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    fetchProductsByCategory 
  } = useProducts();

  useEffect(() => {
    fetchProductsByCategory(category, currentPage);
  }, [category, currentPage]);

  if (loading) return <div className="filter-page loading">Loading...</div>;
  if (error) return <div className="filter-page error">Error: {error}</div>;

  return (
    <div className="filter-page">
      <h2 className="category-title">{category}</h2>
      <div className="filtered-products">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <Pagination 
        totalPosts={pagination.totalProducts} 
        postsPerPage={9} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}

export default FilterPage;