import { useState, useEffect } from 'react';
import { indexTweets, indexTweetsTags, indexUsers } from '../algolia-config';
import getUpdatedTweetByID from '../utils/tweets/getUpdatedTweetByID';

export default function useAlgoliaSearch(query: string, filter: string) {
  const [tweets, setTweets] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getTweets = async () => {
    try {
      let res;

      if (query.startsWith('#')) {
        res = await indexTweetsTags.search(query, {
          hitsPerPage: 30,
        });
      } else {
        res = await indexTweets.search(query, {
          hitsPerPage: 30,
        });
      }

      const { hits } = res;

      const updatedHits = hits.map((twt) => getUpdatedTweetByID(twt.objectID));

      const readyHits = await Promise.all(updatedHits);

      setTweets(readyHits);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUsers = async () => {
    try {
      const { hits } = await indexUsers.search(query, {
        hitsPerPage: 30,
      });

      setUsers(hits);
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
      setLoading(true);
      getResults();
      ran = true;
    }

    return () => {
      setTweets([]);
      setUsers([]);
      setLoading(true);
    };
  }, [query, filter]);

  return [tweets, users, loading];
}
