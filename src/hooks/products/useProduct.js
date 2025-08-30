import { useQuery } from '@tanstack/react-query';

const fetchProduct = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error('Error fetching product');
  }
  return response.json();
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000,
  });
};