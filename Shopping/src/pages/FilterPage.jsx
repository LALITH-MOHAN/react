import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import '../styles/FilterPage.css';

const fetcher = (url) => fetch(url).then(res => res.json());

function FilterPage() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localProducts = [] } = useProducts();

  const { data: apiData, error: apiError } = useSWR(
    `http://localhost:3000/api/products/category/${encodeURIComponent(category)}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  // Memoize the filtered products to prevent unnecessary recalculations
  const memoizedFilteredProducts = useMemo(() => {
    try {
      // Safely filter local products
      const localFiltered = Array.isArray(localProducts) 
        ? localProducts.filter(p => 
            p?.category?.toLowerCase() === category?.toLowerCase()
          )
        : [];
      
      // Safely handle API data
      const apiFiltered = Array.isArray(apiData) ? apiData : [];
      
      return [...apiFiltered, ...localFiltered];
    } catch (err) {
      setError(err.message);
      console.error("Failed to process category products:", err);
      return [];
    }
  }, [category, localProducts, apiData]);

  useEffect(() => {
    setLoading(true);
    setFilteredProducts(memoizedFilteredProducts);
    setLoading(false);
    
    if (apiError) {
      setError(apiError.message);
    }
  }, [memoizedFilteredProducts, apiError]);

  if (loading) return <div className="filter-page loading">Loading...</div>;
  if (error) return <div className="filter-page error">Error: {error}</div>;

  return (
    <div className="filter-page">
      <h2 className="category-title">{category}</h2>
      <div className="filtered-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default FilterPage;