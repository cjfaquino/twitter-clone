import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useTweets() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;

  useEffect(() => {
    const queryRef = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc')
    );

    getDocs(queryRef)
      .then((qSnap) => {
        count += 1;

        qSnap.forEach((item) => {
          if (count === 1) {
            setTweets((prev) => [...prev, item.data()]);
          }
        });
      })
      .catch((e) => console.error(e))
      .finally(setLoading(false));

    return () => {};
  }, []);

  return [tweets, loading];
}
