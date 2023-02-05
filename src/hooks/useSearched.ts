import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';

const useSearched = (search: string): Array<Object> => {
  const [results, setResults] = useState<Array<Object>>([]);

  const getResults = async () => {
    const queryRef = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc'),
      where('text', 'array-contains-any', [search, `#${search}`])
    );

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

  return [results];
};

export default useSearched;
