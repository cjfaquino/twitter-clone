import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';

export default function useTweets(filter: string, userID: string) {
  const [tweets, setTweets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTweets = async () => {
    try {
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
          setTweets((prev: any) => [...prev, { id: item.id, ...item.data() }]);
        }

        if (
          filter === 'user tweets&replies' &&
          userID &&
          item.data().USER_ID === userID
        ) {
          setTweets((prev: any) => [...prev, { id: item.id, ...item.data() }]);
        }

        if (filter === 'tweets' && item.data().aReplyTo === null)
          setTweets((prev: any) => [...prev, { id: item.id, ...item.data() }]);
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const getLikes = async () => {
    try {
      const likesQuery = query(
        collection(db, 'users', userID, 'likes'),
        orderBy('likedAt', 'desc')
      );
      const qSnap = await getDocs(likesQuery);
      const queue: any[] = [];
      qSnap.forEach(async (item) => {
        queue.push(getUpdatedTweetByID(item.id));
      });
      const likedTweets = await Promise.all(queue);
      setTweets(likedTweets);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  let ran = false;
  useEffect(() => {
    // filter is not likes
    if (!ran && filter !== 'user likes') {
      getTweets();
      ran = true;
    }

    // filter is likes
    if (!ran && filter === 'user likes') {
      getLikes();
      ran = true;
    }

    return () => {
      setTweets([]);
      setLoading(true);
    };
  }, [filter, userID]);

  // add temp tweet to DOM
  const addTweetToDOM = (tweetObj: any) => {
    setTweets((prev: any) => [tweetObj, ...prev]);
  };

  return [tweets, addTweetToDOM, loading];
}
