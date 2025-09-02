import { useQuery } from '@tanstack/react-query';

const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`https://mercartback.vercel.app/api/productos/categoria/${categoryId}`);
    if (!response.ok) {
      throw new Error('Error fetching products by category');
    }
    const data = await response.json();
    return data.productos;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};

export const useCategoryProducts = (categoryId) => {
  return useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};