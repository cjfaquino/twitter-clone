import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useInput from '../hooks/useInput';

interface IProps {
  searched?: string;
}

const defaultProps = {
  searched: false,
};

const SearchHeader = ({ searched }: IProps) => {
  const [search, handleSearch, setSearch] = useInput(searched);
  const navigate = useNavigate();
  const clrSearch = () => {
    setSearch('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searched) {
      navigate({
        pathname: '/search',
        search: createSearchParams({ q: search }).toString(),
      });
    }
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

SearchHeader.defaultProps = defaultProps;

export default SearchHeader;
