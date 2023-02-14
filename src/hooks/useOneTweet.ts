import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import getUpdatedTweetByID from '../utils/getUpdatedTweetByID';

export default function useOneTweet(tweetID: string): [any, boolean] {
  const [tweet, setTweet] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTweet = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'tweets', tweetID);
      const docSnap = await getDoc(docRef);

      // no document
      if (!docSnap.exists()) throw Error('No such tweet exists');

      // tweet exists

      // for tweet obj with aReplyTo
      // get up to date stats of aReplyTo if it exists
      let replyingTo = null;
      if (docSnap.data().aReplyTo) {
        const replyingToID = docSnap.data().aReplyTo.id;
        replyingTo = await getUpdatedTweetByID(replyingToID);
      }
      const newTwt = {
        ...docSnap.data(),
        ...{ aReplyTo: replyingTo },
      };

      setTweet({
        id: docSnap.id,
        ...newTwt,
        // for algolia 'tweets' index
        objectID: docSnap.id,
      });
      setLoading(false);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    loadTweet();

    return () => {
      setTweet(null);
    };
  }, [tweetID]);

  return [tweet, loading];
}
