import { useQuery } from '@tanstack/react-query';

// Constantes para configuración
const API_BASE_URL = 'https://fakestoreapi.com';
const STALE_TIME = 5 * 60 * 1000; // 5 minutos
const CACHE_TIME = 30 * 60 * 1000; // 30 minutos

const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validar que los datos tengan la estructura esperada
  if (!Array.isArray(data)) {
    throw new Error('Invalid data format received from API - expected array');
  }
  
  return data;
};

export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    retry: 2, // Reintentar 2 veces antes de fallar
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
    refetchOnWindowFocus: false, // No recargar cuando la ventana gana foco
    refetchOnReconnect: true, // Recargar cuando se recupera conexión
    refetchOnMount: false, // No recargar cuando el componente se monta (si ya hay datos)
    select: (data) => {
      // Transformar datos a la estructura esperada por la aplicación
      return data.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        img: product.image,
        images: [product.image], // Crear array de imágenes
        category: product.category,
        description: product.description,
        // Incluir todos los datos originales por si se necesitan
        ...product
      }));
    },
    ...options // Permitir override de opciones por defecto
  });
};

// Hook derivado para productos filtrados por categoría
export const useProductsByCategory = (category, options = {}) => {
  return useProducts({
    ...options,
    select: (data) => {
      const transformedData = data.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        img: product.image,
        images: [product.image],
        category: product.category,
        description: product.description,
        ...product
      }));
      
      // Filtrar por categoría si se especifica
      return category 
        ? transformedData.filter(product => 
            product.category.toLowerCase() === category.toLowerCase())
        : transformedData;
    },
    enabled: options.enabled !== false // Habilitado por defecto, pero permitir override
  });
};