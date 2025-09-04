import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await fetch('https://mercartback.vercel.app/api/categorias');
  if (!response.ok) {
    throw new Error('Error fetching categories');
  }
  const data = await response.json();

  return data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};