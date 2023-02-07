import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase-config';
import getProfilePicUrl from './getProfilePicUrl';
import updateDisplayNameAndPhoto from './updateDisplayNameAndPhoto';
import eventProfileEdit from './eventProfileEdit';

interface CreateProfile {
  user: User;
  userName: string;
  displayName: string;
  photoURL: string;
}

const createProfile = async ({
  user,
  userName,
  displayName,
  photoURL = getProfilePicUrl(),
}: CreateProfile) => {
  try {
    // update firebase auth user
    await updateDisplayNameAndPhoto({ displayName, photoURL });

    // save new profile to firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      userName,
      displayName,
      photoURL,
      metadata: { ...user.metadata },
    });

    eventProfileEdit();
  } catch (error) {
    console.error('Error saving new profile to Firebase Database', error);
  }
};

export default createProfile;
