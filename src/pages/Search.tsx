import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import useSearched from '../hooks/useSearched';
import TweetItem from '../components/TweetItem';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searched = searchParams.get('q') || '';
  const results = useSearched(searched);
  const algoliaResults = useAlgoliaSearch(searched);
  console.log(algoliaResults);

  return (
    <div id='search'>
      <SearchHeader searched={searched} />
      {algoliaResults.map((twt: Object) => (
        <TweetItem key={`results-${twt.id}`} tweetObj={twt} />
      ))}
    </div>
  );
};

export default Search;
