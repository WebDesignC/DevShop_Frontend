import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ContainerFilter } from '../components/ContainerFilter';
import { Pagination } from '../components/Pagination';
import '../styles/ProductsPage.css';

const localProducts = [
  {
    id: 1,
    title: "Classic White T-Shirt",
    price: 24.99,
    description: "100% cotton classic white t-shirt. Perfect for everyday wear and easy to combine with any outfit.",
    category: "ropa",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Denim Jacket",
    price: 89.99,
    description: "Vintage style denim jacket with a comfortable fit. Perfect for casual outings and cool evenings.",
    category: "ropa",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Wool Sweater",
    price: 65.50,
    description: "Warm and comfortable wool sweater for the winter season. Available in multiple colors.",
    category: "ropa",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with heart rate monitoring, GPS, and smartphone connectivity.",
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Compact Bluetooth speaker with impressive sound quality and waterproof design.",
    category: "tecnologia",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    title: "Modern Table Lamp",
    price: 45.99,
    description: "Sleek modern table lamp with adjustable brightness and touch control.",
    category: "decoracion",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    title: "Decorative Wall Art",
    price: 75.00,
    description: "Set of three abstract canvas prints to enhance your living space with modern art.",
    category: "decoracion",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    title: "Ceramic Plant Pot",
    price: 32.50,
    description: "Handcrafted ceramic plant pot with drainage hole. Perfect for indoor plants.",
    category: "decoracion",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    title: "Yoga Mat",
    price: 39.99,
    description: "Non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and exercise routines.",
    category: "deportes",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    title: "Running Shoes",
    price: 89.99,
    description: "Lightweight running shoes with cushion technology for maximum comfort during workouts.",
    category: "deportes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    title: "Water Bottle",
    price: 22.99,
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "deportes",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

const localCategories = [
  "ropa",
  "tecnología",
  "decoracion",
  "deportes"
];

const ProductsPage = () => {
    const location = useLocation();
    const initialCategory = location.state?.category || '';
    
    const [filteredProducts, setFilteredProducts] = useState(localProducts);
    const [selectedCategories, setSelectedCategories] = useState(
        initialCategory ? [initialCategory] : []
    );
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredProducts(localProducts);
        } else {
            setFilteredProducts(localProducts.filter(product => 
                selectedCategories.includes(product.category)
            ));
        }
        setCurrentPage(1);
    }, [selectedCategories]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleCategoryChange = useCallback((categories) => {
    setSelectedCategories(categories);
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

        return (
        <div className='page-container'>
            <div className='page-title-container'>
                <h1 className='page-title'>Productos</h1>
            </div>

            <div className='products-grid'>
                <ContainerFilter 
                  onCategoryChange={handleCategoryChange} 
                  categories={localCategories}
                  initialSelected={initialCategory ? [initialCategory] : []}
                />
                
                <div className='products-container'>
                    {filteredProducts.length === 0 ? (
                        <div className='error-message'>
                            <p>No se encontraron productos en las categorías seleccionadas.</p>
                        </div>
                    ) : (
                        <>
                            <div className='products-list'>
                                {currentProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.title}
                                        price={product.price}
                                        img={product.image}
                                        category={product.category}
                                        description={product.description}
                                    />
                                ))}
                            </div>
                            
                            {totalPages > 1 && (
                                <div className='pagination-container'>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );


};

export default ProductsPage;