import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import updateDisplayName from './updateDisplayName';

const updateProfile = async ({ user, userName, displayName }) => {
  try {
    // update firebase displayName
    await updateDisplayName(displayName);

    // create or update firestore profile
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      userName,
      displayName,
      photoUrl: user.photoUrl,
    });

    return user.uid;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
