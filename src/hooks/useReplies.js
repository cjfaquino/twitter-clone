import { useEffect, useState } from 'react';
import {
  query,
  getDocs,
  collection,
  doc,
  getDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(tweetID) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUpatedReply = async (replyId) => {
    const docRef = doc(db, 'tweets', replyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setReplies((prev) => [...prev, { id: docSnap.id, ...docSnap.data() }]);
    }
  };

  const getReplies = async () => {
    const queryRef = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'desc')
    );
    const qSnap = await getDocs(queryRef);
    qSnap.forEach((rep) => getUpatedReply(rep.id));
    setLoading(false);
  };

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getReplies();
      ran = true;
    }

    return () => {
      setReplies([]);
    };
  }, [tweetID]);

  return [replies, replies.length, loading];
}
