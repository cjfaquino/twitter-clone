import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import getProfilePicUrl from './getProfilePicUrl';
import { UserProfile } from '../interfaces/UserProfile';
import updateDisplayNameAndPhoto from './updateDisplayNameAndPhoto';

interface IArgs {
  userProfile: UserProfile;
  userName?: string;
  displayName: string;
  photoURL?: string;
  backdropURL?: string;
  website: string;
  location: string;
  bio: string;
}

const updateProfile = async ({
  userProfile,
  userName,
  displayName,
  photoURL,
  backdropURL,
  website,
  location,
  bio,
}: IArgs) => {
  try {
    // create or update firestore profile
    const userRef = doc(db, 'users', userProfile.id);
    await updateDisplayNameAndPhoto({
      displayName: displayName || userProfile.displayName,
      photoURL: photoURL || userProfile.photoURL || getProfilePicUrl(),
    });

    await setDoc(userRef, {
      userName: userName || userProfile.userName,
      displayName: displayName || userProfile.displayName,
      photoURL: photoURL || getProfilePicUrl(),
      backdropURL,
      website,
      location,
      bio,
      metadata: { ...userProfile.metadata },
    });

    // fire profile event
    eventProfileEdit();

    return true;
  } catch (error) {
    console.error('Error updating user profile to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
