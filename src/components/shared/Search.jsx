import { useState } from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import '../../styles/Search.css';

export const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch(''); 
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <HiOutlineSearch className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-search-btn"
            >
              <HiOutlineX size={20} />
            </button>
          )}
        </div>
        <button type="submit" className="search-submit-btn">
          Buscar
        </button>
      </form>
    </div>
  );
};