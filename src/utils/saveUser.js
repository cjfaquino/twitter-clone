import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const saveUser = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const docRef = await setDoc(userRef, {
      userName: user.userName,
      likes: {},
      retweets: {},
    });

    return docRef.id;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default saveUser;
