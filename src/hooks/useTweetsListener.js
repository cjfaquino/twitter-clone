import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import deleteTweetFromDOM from '../utils/deleteTweetFromDOM';

function useTweetsListener() {
  const [tweets, setTweets] = useState([]);
  const [allTweetsLoading, setAllTweetsLoading] = useState(null);

  const updateReplyFromDOM = (id, newTime) => {
    const tweetDOM = document.getElementById(id);
    const timeDOM = tweetDOM.querySelector('.tweet-item-time');

    // If an element for that message exists we update it.
    if (tweetDOM) {
      timeDOM.textContent = newTime.toDate().toLocaleDateString();
    }
  };

  useEffect(() => {
    setAllTweetsLoading(true);
    const tweetQuery = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'asc')
    );

    // Start listening to the query for updates.
    const unsub = onSnapshot(tweetQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const tweet = change.doc.data();

        if (change.type === 'removed') {
          // delete message
          deleteTweetFromDOM(tweet.uidTweet);
        } else if (change.type === 'modified') {
          // update message when serverTimestamp finishes
          updateReplyFromDOM(tweet.uidTweet, tweet.timestamp);
        } else if (change.type === 'added') {
          // add new tweet
          setTweets((arr) => [tweet, ...arr]);
        }
      });
      // after inital loading of all tweets only
      setAllTweetsLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return [tweets, allTweetsLoading];
}

export default useTweetsListener;
