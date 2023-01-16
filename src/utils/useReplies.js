import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(tweetID) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;

  useEffect(() => {
    const queryRef = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'desc')
    );

    getDocs(queryRef)
      .then((qSnap) => {
        count += 1;

        qSnap.forEach((item) => {
          if (count === 1) {
            setReplies((prev) => [...prev, { id: item.id, data: item.data() }]);
          }
        });
      })
      .catch((e) => console.error(e))
      .finally(setLoading(false));

    return () => {};
  }, []);

  return [replies, replies.length, loading];
}
