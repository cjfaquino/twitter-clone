import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';
import undoLike from '../utils/undoLike';
import { TweetObj } from '../interfaces/TweetObj';

export default function useTweets(
  filter: string,
  userID?: string
): [DocumentData[], Function, boolean] {
  const [tweets, setTweets] = useState<DocumentData[]>([]);
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

      const resultsPromise = qSnap.docs.map(async (item) => {
        let replyingTo = null;
        if (item.data().aReplyTo) {
          const replyingToID = item.data().aReplyTo.id;
          replyingTo = await getUpdatedTweetByID(replyingToID);
        }
        const newTwt = {
          ...item.data(),
          ...{ aReplyTo: replyingTo },
        };
        return {
          id: item.id,
          ...newTwt,

          // for algolia
          objectID: item.id,
        };
      });

      const fetched = await Promise.all(resultsPromise);

      setTweets(fetched);
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

      // if original tweets are deleted but still referenced in likes, filter them out before displaying
      const filtered = likedTweets.filter((twt) => !twt.id.startsWith('null'));
      // removes like reference from users collection
      likedTweets.forEach((twt) => {
        if (twt.id.startsWith('null')) {
          const deletedID = twt.id.replace(/null-/, '');
          undoLike(deletedID, userID, true);
        }
      });

      setTweets(filtered);
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
  const addTweetToDOM = useCallback((tweetObj: TweetObj) => {
    setTweets((prev) => [tweetObj, ...prev]);
  }, []);

  return [tweets as TweetObj[], addTweetToDOM, loading];
}
