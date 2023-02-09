import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';

interface IArgs {
  user: User;
  userName: string;
}

const updateProfile = async ({ user, userName }: IArgs) => {
  try {
    // create or update firestore profile
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      userName,
      displayName: user.displayName,
      photoURL: user.photoURL,
      metadata: { ...user.metadata },
    });

    // fire profile event
    eventProfileEdit();

    return true;
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
