import { useQuery } from '@tanstack/react-query';

// Constantes para configuración
const API_BASE_URL = 'https://fakestoreapi.com';
const FEATURED_LIMIT = 4;
const STALE_TIME = 5 * 60 * 1000; // 5 minutos

const fetchFeaturedProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products?limit=${FEATURED_LIMIT}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching featured products: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validar que los datos tengan la estructura esperada
  if (!Array.isArray(data)) {
    throw new Error('Invalid data format received from API');
  }
  
  return data;
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: STALE_TIME,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    select: (data) => {
      return data.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        img: product.image,
        category: product.category,
        description: product.description
      }));
    }
  });
};