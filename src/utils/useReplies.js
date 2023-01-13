import { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase-config';

function useReplies(tweetID) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(0);

  // Delete a Message from the UI.
  const deleteReplyFromDOM = (id) => {
    const div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  };

  useEffect(() => {
    setLoading(true);
    const replyQuery = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'desc')
    );

    getDocs(replyQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setReplies((arr) => [...arr, doc.data()]);
        });
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));

    // Start listening to the query for updates.
    const unsub = onSnapshot(replyQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const reply = change.doc.data();
        setLength(snapshot.size);
        if (change.type === 'removed') {
          // delete message
          deleteReplyFromDOM(reply.uidReply);
        } else if (change.type === 'modified') {
          // add new tweet
          setReplies((arr) => [reply, ...arr]);
        }
      });
    });

    return () => {
      unsub();
    };
  }, []);

  return [replies, length, loading];
}

export default useReplies;
