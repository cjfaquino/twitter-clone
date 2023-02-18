import { useEffect, useState } from 'react';
import {
  query,
  getDocs,
  collection,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/tweets/getUpdatedTweetByID';

export default function useReplies(
  tweetID: string
): [DocumentData[], boolean, React.Dispatch<React.SetStateAction<any[]>>] {
  const [replies, setReplies] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const getReplies = async () => {
    const queryRef = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'asc')
    );
    const qSnap = await getDocs(queryRef);
    const repliesPromise = qSnap.docs.map((rep) => getUpdatedTweetByID(rep.id));
    const fetched = await Promise.all(repliesPromise);
    setReplies(fetched);
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

  return [replies, loading, setReplies];
}
