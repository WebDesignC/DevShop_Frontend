import { useQuery } from '@tanstack/react-query';

const fetchProduct = async (id) => {
  try {
    const response = await fetch(`https://mercartback.vercel.app/api/productos/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.producto || data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error('Error al cargar el producto');
  }
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000,
    retry: 2, // Reintentar 2 veces en caso de error
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};