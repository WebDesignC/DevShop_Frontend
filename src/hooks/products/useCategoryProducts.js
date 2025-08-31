import { useQuery } from '@tanstack/react-query';

const fetchProductsByCategory = async (category) => {
  // Se usan las categoría de la API de fakestore para la demostración provisonal
  const categoryMap = {
    "ropa": "women's clothing", 
    "tecnologia": "electronics",
    "decoracion-y-hogar": "jewelery", 
    "deportes": "men's clothing" 
  };

  const apiCategory = categoryMap[category] || category;
  
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${apiCategory}`);
    if (!response.ok) {
      throw new Error('Error fetching products by category');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};

export const useCategoryProducts = (category) => {
  return useQuery({
    queryKey: ['categoryProducts', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};