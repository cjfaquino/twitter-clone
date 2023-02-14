import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import useInput from '../hooks/useInput';

interface IProps {
  searched?: string;
  query?: string;
  filter?: string;
  setQuery?: Function;
}

const defaultProps = {
  searched: '',
  query: '',
  filter: 'latest',
  setQuery: (e: any) => e,
};

const SearchHeader = ({
  searched,
  query,
  filter,
  setQuery,
}: IProps & typeof defaultProps) => {
  const [search, handleSearch, setSearch] = useInput(query || searched);
  const navigate = useNavigate();
  const clrSearch = () => {
    setSearch('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) {
      navigate({
        pathname: '/search',
        search: createSearchParams({ q: search, f: filter }).toString(),
      });
    }
  };

  return (
    <header className='search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={search}
          placeholder={`Search ${import.meta.env.VITE_APP_NAME}`}
          onChange={(e) => {
            handleSearch(e);
            setQuery(e.target.value);
          }}
        />
        <button type='submit'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {search && (
          <button
            type='button'
            className='btn-reset-search'
            onClick={clrSearch}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        )}
      </form>
    </header>
  );
};

SearchHeader.defaultProps = defaultProps;

export default SearchHeader;
