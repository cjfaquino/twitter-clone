import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useInput from '../hooks/useInput';

const SearchHeader = () => {
  const [search, handleSearch, setSearch] = useInput();
  const navigate = useNavigate();
  const clrSearch = () => {
    setSearch('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchWithOutHash = search.replace(/#/g, '');
    navigate(`/search/${searchWithOutHash}`);
  };

  return (
    <header className='search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          placeholder='search'
          onChange={handleSearch}
        />
        <button type='submit' className='btn-search'>
          <FontAwesomeIcon icon={faSearch} />
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
