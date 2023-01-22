import { updateProfile, getAuth } from 'firebase/auth';

const updateDisplayNameOrPhoto = async (
  displayName = null,
  photoURL = null
) => {
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

export default updateDisplayNameOrPhoto;
