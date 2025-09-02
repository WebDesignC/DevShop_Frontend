import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('fakeStoreCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('fakeStoreCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const addItem = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1,
        id: product.id,
        name: product.name || product.nombre,
        price: product.price || product.precio,
        image: product.image || product.imagen,
        category: product.category || product.categoria?.nombre,
        description: product.description || product.descripcion
      }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    addItem,
    clearCart,
    isLoading,
  };
};