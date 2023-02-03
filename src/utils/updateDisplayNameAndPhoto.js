import { updateProfile, getAuth } from 'firebase/auth';

const updateDisplayNameAndPhoto = async ({ displayName, photoURL }) => {
  const auth = getAuth();
  await updateProfile(auth.currentUser, {
    displayName,
    photoURL,
  })
    .then(() => {
      // Profile updated!
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateDisplayNameAndPhoto;
