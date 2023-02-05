import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

const SearchHeader = () => {
  const [search, handleSearch, setSearch] = useInput();
  const navigate = useNavigate();
  const clrSearch = () => {
    setSearch('');
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const searchWithOutHash = search.replace(/#/g, '');
    navigate(`/search/${searchWithOutHash}`);
  };

  return (
    <header className='search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <input type='text' value={search} onChange={handleSearch} />
        <button type='submit' className='btn-search'>
          Search
        </button>
        {search && (
          <button
            type='button'
            className='btn-reset-search'
            onClick={clrSearch}
          >
            X
          </button>
        )}
      </form>
    </header>
  );
};

export default SearchHeader;
