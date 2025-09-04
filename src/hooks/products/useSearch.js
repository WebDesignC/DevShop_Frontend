import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchAllProducts = async () => {
  const response = await fetch('https://mercartback.vercel.app/api/productos');
  
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  
  const data = await response.json();
  const products = Array.isArray(data) ? data : (data.productos || []);
  
  return products
    .filter(product => product && product._id)
    .map(product => ({
      id: product._id,
      title: product.nombre,
      price: product.precio,
      image: product.imagen,
      category: product.categoria?.nombre,
      description: product.descripcion
    }));
};

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm) {
        setHasSearched(true);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const searchResults = useMemo(() => {
    if (!allProducts) return [];
    if (!debouncedSearchTerm.trim()) return [];
    
    const term = debouncedSearchTerm.toLowerCase();
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      (product.category && product.category.toLowerCase().includes(term))
    );
  }, [allProducts, debouncedSearchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setHasSearched(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchTerm,
    setSearchTerm: handleSearch,
    hasSearched
  };
};