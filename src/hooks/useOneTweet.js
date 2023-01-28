import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function useOneTweet(tweetID) {
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReplyingTo = async (replyingToID) => {
    let replyingTo = null;
    const repRef = doc(db, 'tweets', replyingToID);
    const repSnap = await getDoc(repRef);

    if (repSnap.exists()) {
      replyingTo = { id: repSnap.id, data: repSnap.data() };
    } else console.log('Cannot get replying to tweet');

    // replyingTo will be a tweetObj or null
    return replyingTo;
  };

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
      if (tweet && tweet.id !== docSnap.id && docSnap.data().aReplyTo) {
        const replyingToID = docSnap.data().aReplyTo.id;
        replyingTo = await loadReplyingTo(replyingToID);
      }

      const newTwt = {
        ...docSnap.data(),
        ...{ aReplyTo: replyingTo },
      };

      setTweet({ id: docSnap.id, data: newTwt });
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
