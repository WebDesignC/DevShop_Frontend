import { useQuery } from '@tanstack/react-query';

// Constantes para configuración
const API_BASE_URL = 'https://fakestoreapi.com';
const STALE_TIME = 5 * 60 * 1000; // 5 minutos

const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: STALE_TIME,
    retry: 2, // Reintentar 2 veces antes de fallar
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
    refetchOnWindowFocus: false, // No recargar cuando la ventana gana foco
    refetchOnReconnect: true, // Recargar cuando se recupera conexión
    refetchOnMount: false, // No recargar cuando el componente se monta (si ya hay datos)
  });
};