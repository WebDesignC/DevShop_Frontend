import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch('https://mercartback.vercel.app/api/productos');
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : (data.productos || []);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
};