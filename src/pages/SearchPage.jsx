import { Search } from '../components/shared/Search';
import '../styles/SearchPage.css';
import { ProductCard } from '../components/products/ProductCard';
import { useSearch } from '../hooks/products/useSearch';

export const SearchPage = () => {
  const { searchResults, isLoading, error, searchTerm, setSearchTerm, hasSearched } = useSearch();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="search-page-container">
      <div className="search-page-header">
        <h1>Buscar Productos</h1>
        <Search onSearch={handleSearch} />
      </div>

      <div className="search-results">
        {hasSearched && (
          <>
            <h2>Resultados de búsqueda</h2>
            {isLoading ? (
              <p className="results-count">Buscando productos...</p>
            ) : error ? (
              <p className="results-count">Error: {error.message}</p>
            ) : (
              <>
                <p className="results-count">
                  {searchResults.length} producto(s) encontrado(s) 
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
                <div className="search-products-grid">
                  {searchResults.map(product => (
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};