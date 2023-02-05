import React from 'react';
import useInput from '../hooks/useInput';

const SearchHeader = () => {
  const [search, handleSearch, setSearch] = useInput();

  const clrSearch = () => {
    setSearch('');
  };

  return (
    <header className='search'>
      <form className='search-form'>
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
