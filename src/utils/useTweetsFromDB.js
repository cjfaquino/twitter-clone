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

  // Delete a Message from the UI.
  const deleteTweetFromDOM = (id) => {
    const div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  };

  useEffect(() => {
    setLoading(true);
    const tweetQuery = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc')
    );

    getDocs(tweetQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTweets((arr) => [...arr, doc.data()]);
        });
      })
      .finally(() => setLoading(false));

    // Start listening to the query for updates.
    const unsub = onSnapshot(tweetQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const tweet = change.doc.data();

        if (change.type === 'removed') {
          // delete message
          deleteTweetFromDOM(tweet.uidTweet);
        } else if (change.type === 'modified') {
          // add new tweet
          setTweets((arr) => [tweet, ...arr]);
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
