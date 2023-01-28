import { doc, setDoc } from 'firebase/firestore';
import { getProfilePicUrl } from '../firebase';
import { db } from '../firebase-config';
import updateDisplayNameOrPhoto from './updateDisplayNameOrPhoto';

const updateProfile = async ({ user, userName, displayName, photoUrl }) => {
  try {
    // update firebase user
    await updateDisplayNameOrPhoto(displayName, photoUrl);

    // create or update firestore profile
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      userName,
      displayName,
      photoUrl: getProfilePicUrl(),
      bio: '',
    });

    return user.uid;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
