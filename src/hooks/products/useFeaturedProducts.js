import { useQuery } from '@tanstack/react-query';

const fetchFeaturedProducts = async () => {
  const response = await fetch('https://mercartback.vercel.app/api/productos');
  if (!response.ok) {
    throw new Error('Error fetching productos desatacados');
  }
  const data = await response.json();
  const products = Array.isArray(data) ? data : (data.productos || []);
  
  return products.slice(0, 4);
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};