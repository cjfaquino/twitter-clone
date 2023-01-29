import { updateEmail, getAuth } from 'firebase/auth';

async function updateUserEmail(email) {
  try {
    const auth = getAuth();
    const res = await updateEmail(auth.currentUser, email);
    return res;
  } catch (error) {
    return error.code;
  }
}

export default updateUserEmail;
