import { useState, useEffect } from 'react';
import indexTweets from '../algolia-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';

export default function useAlgoliaSearch(query: string) {
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
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

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getResults();
      ran = true;
    }

    return () => {
      setResults([]);
    };
  }, [query]);

  return [results, loading];
}
