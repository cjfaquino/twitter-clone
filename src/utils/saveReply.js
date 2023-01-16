import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import Reply from './Reply';

// converts Reply for firestore
const replyConverter = {
  toFirestore: (reply) => ({
    USER_ID: reply.USER_ID,
    USER_NAME: reply.USER_NAME,
    USER_ICON: reply.USER_ICON,
    text: reply.text,
    timestamp: reply.timestamp,
  }),
  // fromFirestore: (snapshot, options) => {
  //   const data = snapshot.data(options);
  //   return data;
  // },
};

// Save all replies to tweets doc

const saveReply = async (tweetID, messageText) => {
  try {
    const collectionRef = collection(
      db,
      'tweets',
      tweetID,
      'replies'
    ).withConverter(replyConverter);
    const docRef = await addDoc(collectionRef, new Reply(messageText));
    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveReply;
