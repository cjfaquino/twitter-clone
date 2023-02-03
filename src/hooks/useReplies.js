import { useEffect, useState } from 'react';
import { query, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(tweetID) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;
  useEffect(() => {
    const getReplies = async () => {
      const queryRef = query(collection(db, 'tweets', tweetID, 'replies'));
      const qSnap = await getDocs(queryRef);
      qSnap.forEach((rep) =>
        setReplies((prev) => [...prev, { id: rep.id, ...rep.data() }])
      );
      setLoading(false);
    };

    if (count < 1) {
      getReplies();
    }

    count += 1;
    return () => {
      setReplies([]);
    };
  }, [tweetID]);

  return [replies, replies.length, loading];
}
