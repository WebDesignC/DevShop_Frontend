import { useState, useEffect, useCallback } from 'react';

// Clave constante para localStorage
const CART_STORAGE_KEY = 'fakeStoreCart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoading]);

  // Primero definir removeItem para que pueda ser usada en updateQuantity
  const removeItem = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Ahora updateQuantity puede referenciar removeItem
  const updateQuantity = useCallback((id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeItem]); // removeItem añadido como dependencia

  const addItem = useCallback((product) => {
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
        image: product.image || product.img,
        name: product.name || product.title
      }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calcular valores derivados del carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    cartItems,
    updateQuantity,
    removeItem,
    addItem,
    clearCart,
    isLoading,
    totalItems,
    totalPrice,
  };
};