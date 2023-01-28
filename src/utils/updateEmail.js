import { updateEmail, getAuth } from 'firebase/auth';

async function updateUserEmail(email) {
  const auth = getAuth();
  await updateEmail(auth.currentUser, email)
    .then(() => {
      // Email updated!
    })
    .catch((error) => {
      console.log(error);
    });
}

export default updateUserEmail;
