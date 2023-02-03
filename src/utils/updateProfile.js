import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const updateProfile = async ({ user, userName }) => {
  try {
    // create or update firestore profile
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      userName,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      createdAt: user.metadata.createdAt,
    });

    return user.uid;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
