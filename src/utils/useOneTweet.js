import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useOneTweet(tweetID) {
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'tweets', tweetID);
    setLoading(true);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists() && tweet !== docSnap.data()) {
          setTweet({ id: docSnap.id, data: docSnap.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .finally(setLoading(false));

    return () => {
      setTweet(null);
    };
  }, [tweetID]);

  return [tweet, setTweet, loading];
}
