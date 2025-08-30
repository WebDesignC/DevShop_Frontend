import { useQuery } from '@tanstack/react-query';

const fetchFeaturedProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=4');
  if (!response.ok) {
    throw new Error('Error fetching featured products');
  }
  return response.json();
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
  });
};