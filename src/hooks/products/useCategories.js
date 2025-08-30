import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Error fetching categories');
  }
  return response.json();
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};