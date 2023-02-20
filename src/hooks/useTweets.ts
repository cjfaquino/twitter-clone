import { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/tweets/getUpdatedTweetByID';
import undoLike from '../utils/likes/undoLike';
import { TweetObj } from '../interfaces/TweetObj';
import getFollows from '../utils/follows/getFollows';

export default function useTweets(
  filter: string,
  userID?: string
): [TweetObj[], boolean] {
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

        case 'home':
          {
            const following = await getFollows('following');
            queryRef = query(
              collection(db, 'tweets'),
              where('USER_ID', 'in', [userID, ...following]),
              where('aReplyTo', '==', null),
              orderBy('timestamp', 'desc')
            );
          }
          break;

        case 'all':
          queryRef = query(
            collection(db, 'tweets'),
            orderBy('timestamp', 'desc')
          );
          break;

        default:
          // dont load tweets
          return;
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

  useEffect(() => {
    const timer = setTimeout(() => {
      // filter is not likes
      if (filter !== 'user likes') {
        getTweets();
      }

      // filter is likes
      if (filter === 'user likes') {
        getLikes();
      }
      console.log('ran');
    }, 200);

    return () => {
      setTweets([]);
      setLoading(true);
      clearTimeout(timer);
    };
  }, [filter, userID]);

  return [tweets as TweetObj[], loading];
}
