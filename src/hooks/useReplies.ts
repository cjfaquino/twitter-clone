import { useEffect, useState } from 'react';
import {
  query,
  getDocs,
  collection,
  doc,
  getDoc,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useReplies(
  tweetID: string
): [DocumentData[], boolean, React.Dispatch<React.SetStateAction<any[]>>] {
  const [replies, setReplies] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const getUpdatedReply = async (replyId: string) => {
    const docRef = doc(db, 'tweets', replyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setReplies((prev: any) => [
        ...prev,
        { id: docSnap.id, ...docSnap.data() },
      ]);
    }
  };

  const getReplies = async () => {
    const queryRef = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'asc')
    );
    const qSnap = await getDocs(queryRef);
    qSnap.forEach((rep) => getUpdatedReply(rep.id));
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
