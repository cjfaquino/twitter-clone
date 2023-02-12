import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import getDisplayName from './getDisplayName';
import getProfilePicUrl from './getProfilePicUrl';

interface IArgs {
  displayName?: string;
  photoURL?: string;
}

const updateDisplayNameAndPhoto = async ({ displayName, photoURL }: IArgs) => {
  await updateProfile(auth.currentUser!, {
    displayName: displayName || getDisplayName(),
    photoURL: photoURL || getProfilePicUrl(),
  })
    .then(() => {
      // Profile updated!
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateDisplayNameAndPhoto;
