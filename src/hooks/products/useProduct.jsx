import { useQuery } from '@tanstack/react-query';

// Constantes para configuración
const API_BASE_URL = 'https://fakestoreapi.com';
const STALE_TIME = 5 * 60 * 1000; // 5 minutos

const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('Product ID is required');
  }
  
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching product: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validar que los datos tengan la estructura esperada
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data format received from API');
  }
  
  return data;
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Solo ejecutar si hay un ID válido
    staleTime: STALE_TIME,
    retry: (failureCount, error) => {
      // No reintentar si el error es por ID faltante o formato inválido
      if (error.message.includes('Product ID is required') || 
          error.message.includes('Invalid data format')) {
        return false;
      }
      // Reintentar solo 2 veces para otros errores
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
    refetchOnWindowFocus: false, // No recargar cuando la ventana gana foco
    refetchOnReconnect: true, // Recargar cuando se recupera conexión
    refetchOnMount: false, // No recargar cuando el componente se monta (si ya hay datos)
    select: (data) => {
      // Transformar datos a la estructura esperada por la aplicación
      return {
        id: data.id,
        name: data.title,
        price: data.price,
        img: data.image,
        images: [data.image], // Crear array de imágenes
        category: data.category,
        description: data.description,
        // Incluir todos los datos originales por si se necesitan
        ...data
      };
    }
  });
};