import { useState, useEffect } from 'react';
import { indexTweets, indexUsers } from '../algolia-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';

export default function useAlgoliaSearch(query: string, filter: string) {
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getTweets = async () => {
    try {
      setLoading(true);
      const { hits } = await indexTweets.search(query, {
        hitsPerPage: 30,
      });

      const updatedHits = hits.map((twt) => getUpdatedTweetByID(twt.id));

      const readyHits = await Promise.all(updatedHits);

      setResults(readyHits);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const { hits } = await indexUsers.search(query, {
        hitsPerPage: 30,
      });

      setResults(hits);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getResults = async () => {
    if (filter === 'latest') getTweets();
    if (filter === 'people') getUsers();
  };

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getResults();
      ran = true;
    }

    return () => {
      setResults([]);
    };
  }, [query, filter]);

  return [results, loading];
}
