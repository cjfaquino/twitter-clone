import { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase-config';

function useTweetsFromDB() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const tweetQuery = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc')
    );

    (async () => {
      const querySnapshot = await getDocs(tweetQuery);
      querySnapshot.forEach((dc) => {
        // doc.data() is never undefined for query doc snapshots
        // load all tweets at runtime
        setTweets((arr) => [...arr, { data: dc.data(), id: dc.id }]);
      });
      setLoading(false);
    })();

    // Start listening to the query for updates.
    const unsub = onSnapshot(tweetQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          // delete message
        } else if (change.type === 'modified') {
          // display new tweet when sent to firestore
          const tweet = change.doc.data();
          const docID = change.doc.id;
          setTweets((arr) => [{ data: tweet, id: docID }, ...arr]);
        }
      });
    });

    return () => {
      unsub();
    };
  }, []);

  return [tweets, loading];
}

export default useTweetsFromDB;
