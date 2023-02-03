import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useTweets(filter, userID) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTweets = async () => {
    const queryRef = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc')
    );

    const qSnap = await getDocs(queryRef);
    qSnap.forEach((item) => {
      if (
        filter === 'user tweets' &&
        userID &&
        item.data().USER_ID === userID &&
        item.data().aReplyTo === null
      ) {
        setTweets((prev) => [...prev, { id: item.id, ...item.data() }]);
      }

      if (
        filter === 'user tweets&replies' &&
        userID &&
        item.data().USER_ID === userID
      ) {
        setTweets((prev) => [...prev, { id: item.id, ...item.data() }]);
      }

      if (filter === 'tweets' && item.data().aReplyTo === null)
        setTweets((prev) => [...prev, { id: item.id, ...item.data() }]);
    });

    setLoading(false);
  };

  let ran = false;
  useEffect(() => {
    if (!ran) {
      getTweets();
      ran = true;
    }

    return () => {
      setTweets([]);
    };
  }, [filter, userID]);

  // add temp tweet to DOM
  const addTweetToDOM = (tweetObj) => {
    setTweets((prev) => [tweetObj, ...prev]);
  };

  return [tweets, addTweetToDOM, loading];
}
