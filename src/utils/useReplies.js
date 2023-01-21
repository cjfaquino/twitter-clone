import { useEffect, useState } from 'react';
import { doc, query, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(arrayOfReplyIDs = []) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let count = 0;

    arrayOfReplyIDs.forEach((replyID) => {
      const queryRef = query(doc(db, 'tweets', replyID));

      if (count === 0) {
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
      }
    });

    count += 1;

    setLoading(false);

    return () => {
      setReplies([]);
    };
  }, [arrayOfReplyIDs]);

  return [replies, replies.length, loading];
}
