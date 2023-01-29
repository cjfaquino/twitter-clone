import { updateProfile, getAuth } from 'firebase/auth';

const updateDisplayName = async (displayName = '') => {
  const auth = getAuth();
  await updateProfile(auth.currentUser, {
    displayName,
  })
    .then(() => {
      // Profile updated!
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateDisplayName;
