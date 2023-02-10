import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import useSearched from '../hooks/useSearched';
import TweetItem from '../components/TweetItem';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searched = searchParams.get('q') || '';
  const results = useSearched(searched);

  return (
    <div id='search'>
      <SearchHeader searched={searched} />
      {results.map((twt: Object) => (
        <TweetItem key={`results-${twt.id}`} tweetObj={twt} />
      ))}
    </div>
  );
};

export default Search;
