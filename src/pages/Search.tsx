import React from 'react';
import { useParams } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader';
import useSearched from '../hooks/useSearched';
import TweetItem from '../components/TweetItem';

const Search = () => {
  const params = useParams();
  const [results] = useSearched(params.search || '');

  return (
    <div id='search'>
      <SearchHeader />
      {results.map((twt: Object) => (
        <TweetItem key={`results-${twt.id}`} tweetObj={twt} />
      ))}
    </div>
  );
};

export default Search;
