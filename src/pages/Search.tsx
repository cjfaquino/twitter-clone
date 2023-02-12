import React, { useState } from 'react';
import { createSearchParams, Link, useSearchParams } from 'react-router-dom';
import ListOfTweets from '../components/ListOfTweets';
import ListOfUsers from '../components/ListOfUsers';
import SearchHeader from '../components/SearchHeader';
import Spinner from '../components/Spinner';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searched = searchParams.get('q') || '';
  const filter = searchParams.get('f');
  const [results, resultsLoading] = useAlgoliaSearch(searched, filter!);
  const [query, setQuery] = useState('');

  return (
    <div id='search'>
      <SearchHeader
        searched={searched}
        query={query}
        filter={filter!}
        setQuery={setQuery}
      />

      <div className='filter-buttons-container'>
        <Link
          to={{
            pathname: '/search',
            search: createSearchParams({
              q: query || searched,
              f: 'latest',
            }).toString(),
          }}
          className={
            filter === 'latest'
              ? 'active styled-filter-link'
              : 'styled-filter-link'
          }
        >
          <span>Latest</span>
        </Link>
        <Link
          to={{
            pathname: '/search',
            search: createSearchParams({
              q: query || searched,
              f: 'people',
            }).toString(),
          }}
          className={
            filter === 'people'
              ? 'active styled-filter-link'
              : 'styled-filter-link'
          }
        >
          <span>People</span>
        </Link>
      </div>

      {resultsLoading && <Spinner />}

      {filter === 'people' && results.length !== 0 && (
        <ListOfUsers users={results} />
      )}

      {filter === 'latest' && results.length !== 0 && (
        <ListOfTweets tweets={results} customClass='search' />
      )}
      {!resultsLoading && results.length === 0 && (
        <div className='missing'>
          Couldn&apos;t find what you&apos;re looking for
        </div>
      )}
    </div>
  );
};

export default Search;
