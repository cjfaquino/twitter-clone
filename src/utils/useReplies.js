import { useEffect, useState } from 'react';
import { doc, query, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(arrayOfReplyIDs = []) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;
  useEffect(() => {
    count += 1;

    if (count > 1) return undefined;

    arrayOfReplyIDs.forEach((replyID) => {
      const queryRef = query(doc(db, 'tweets', replyID));

      getDoc(queryRef)
        .then((qSnap) => {
          if (qSnap.exists()) {
            setReplies((prev) => [
              ...prev,
              { id: qSnap.id, data: qSnap.data() },
            ]);
          }
        })
        .catch((e) => console.log(e));
    });

    setLoading(false);

    return () => {
      setReplies([]);
    };
  }, [arrayOfReplyIDs]);

  return [replies, replies.length, loading];
}
