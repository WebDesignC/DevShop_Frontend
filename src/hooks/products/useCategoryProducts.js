import { useQuery } from '@tanstack/react-query';

const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`https://mercartback.vercel.app/api/productos/categoria/${categoryId}`);
    if (!response.ok) {
      throw new Error('Error fetching productos por categoría');
    }
    const data = await response.json();
    
    if (data.productos && Array.isArray(data.productos)) {
      return data.productos;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.warn('Unexpected API response structure:', data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categoría-productos:", error);
    throw error;
  }
};

export const useCategoryProducts = (categoryId) => {
  return useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};