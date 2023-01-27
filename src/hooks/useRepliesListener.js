import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';

function useRepliesListener(tweetID) {
  const [replies, setReplies] = useState([]);
  const [allRepliesLoading, setAllRepliesLoading] = useState(true);
  const [length, setLength] = useState(0);

  // Delete a Message from the UI.
  const deleteReplyFromDOM = (id) => {
    const div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  };

  const updateReplyFromDOM = (id, newTime) => {
    const replyDOM = document.getElementById(id);
    const timeDOM = replyDOM.querySelector('.reply-item-time');

    // If an element for that message exists we update it.
    if (replyDOM) {
      timeDOM.textContent = newTime.toDate().toLocaleDateString();
    }
  };

  useEffect(() => {
    setAllRepliesLoading(true);
    const replyQuery = query(
      collection(db, 'tweets', tweetID, 'replies'),
      orderBy('timestamp', 'asc')
    );

    // Start listening to the query for updates.
    const unsub = onSnapshot(replyQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const reply = change.doc.data();
        setLength(snapshot.size);
        if (change.type === 'removed') {
          // delete message
          deleteReplyFromDOM(reply.uidReply);
        } else if (change.type === 'modified') {
          // update message when serverTimestamp finishes
          updateReplyFromDOM(reply.uidReply, reply.timestamp);
        } else if (change.type === 'added') {
          // add new tweet
          setReplies((arr) => [...arr, reply]);
        }
      });
      // after initial loading of all replies only
      setAllRepliesLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return [replies, length, allRepliesLoading];
}

export default useRepliesListener;
