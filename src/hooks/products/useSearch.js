import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';

export const useSearch = () => {
  const { data: allProducts, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm && allProducts) {
      const filtered = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(allProducts || []);
    }
  }, [searchTerm, allProducts]);

  return {
    searchResults,
    isLoading,
    error,
    searchTerm,
    setSearchTerm
  };
};