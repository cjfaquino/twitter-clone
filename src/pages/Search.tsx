import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import Spinner from '../components/Spinner';
import TweetItem from '../components/TweetItem';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searched = searchParams.get('q') || '';
  const [results, resultsLoading] = useAlgoliaSearch(searched);

  return (
    <div id='search'>
      <SearchHeader searched={searched} />
      {!resultsLoading ? (
        results.map((twt: Object) => (
          <TweetItem key={`results-${twt.id}`} tweetObj={twt} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Search;
