import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { TweetObj } from '../interfaces/TweetObj';

const useSearched = (search: string): Array<Object | TweetObj> => {
  const [results, setResults] = useState<Array<Object>>([]);

  const getResults = async () => {
    // search by term & related tags
    let queryRef = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc'),
      where('text', 'array-contains-any', [search, `#${search}`])
    );

    if (search.startsWith('#')) {
      // search by tags
      queryRef = query(
        collection(db, 'tweets'),
        orderBy('timestamp', 'desc'),
        where('tags', 'array-contains', search.toLowerCase())
      );
    }

    const qSnap = await getDocs(queryRef);
    qSnap.forEach((item) =>
      setResults((prev) => [...prev, { id: item.id, ...item.data() }])
    );
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
  }, [search]);

  return results;
};

export default useSearched;
