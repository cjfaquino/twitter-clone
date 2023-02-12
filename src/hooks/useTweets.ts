import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';

export default function useTweets(filter: string, userID?: string) {
  const [tweets, setTweets] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTweets = async () => {
    try {
      let queryRef;

      switch (filter) {
        case 'user tweets':
          queryRef = query(
            collection(db, 'tweets'),
            where('USER_ID', '==', userID),
            where('aReplyTo', '==', null),
            orderBy('timestamp', 'desc')
          );
          break;

        case 'user tweets&replies':
          queryRef = query(
            collection(db, 'tweets'),
            where('USER_ID', '==', userID),
            orderBy('timestamp', 'desc')
          );
          break;

        case 'explore':
          queryRef = query(
            collection(db, 'tweets'),
            where('aReplyTo', '==', null),
            orderBy('timestamp', 'desc')
          );
          break;

        default:
          queryRef = query(
            collection(db, 'tweets'),
            orderBy('timestamp', 'desc')
          );
          break;
      }

      const qSnap = await getDocs(queryRef);

      const results = qSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
        // for algolia
        objectID: item.id,
      }));
      setTweets(results);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const getLikes = async () => {
    try {
      const likesQuery = query(
        collection(db, 'users', userID!, 'likes'),
        orderBy('likedAt', 'desc')
      );
      const qSnap = await getDocs(likesQuery);

      const results = qSnap.docs.map((item) => getUpdatedTweetByID(item.id));
      const likedTweets = await Promise.all(results);
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
