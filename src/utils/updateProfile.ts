import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import getProfilePicUrl from './getProfilePicUrl';
import { UserProfile } from '../interfaces/UserProfile';
import updateDisplayNameAndPhoto from './updateDisplayNameAndPhoto';

interface IArgs {
  userProfile: UserProfile;
  userName?: string;
  displayName?: string;
  photoURL?: string;
  backdropURL?: string;
  website?: string;
  location?: string;
  bio?: string;
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
    const currentUser = auth.currentUser!;
    // update stored profile
    const userRef = doc(db, 'users', currentUser.uid);

    await Promise.all([
      updateDisplayNameAndPhoto({
        displayName: displayName || currentUser.displayName!,
        photoURL: photoURL || currentUser.photoURL || getProfilePicUrl(),
      }),
      updateDoc(userRef, {
        userName: userName || userProfile.userName,
        displayName: displayName || currentUser.displayName,
        photoURL: photoURL || getProfilePicUrl(),
        backdropURL: backdropURL || userProfile.backdropURL,
        website: website || userProfile.website,
        location: location || userProfile.location,
        bio: bio || userProfile.bio,
        metadata: { ...currentUser.metadata },
      }),
    ]);

    // fire profile event
    eventProfileEdit();

    return true;
  } catch (error) {
    console.error('Error updating user profile to Firebase Database', error);
    return false;
  }
};

export default updateProfile;
