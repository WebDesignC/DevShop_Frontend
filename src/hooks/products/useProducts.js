import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch('https://mercartback.vercel.app/api/productos');
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const data = await response.json();
  const products = Array.isArray(data) ? data : (data.productos || []);
  
  return products.map(product => ({
    id: product._id,
    title: product.nombre,
    price: product.precio,
    image: product.imagen,
    category: product.categoria?.nombre,
    description: product.descripcion
  }));
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};