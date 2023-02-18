import { AuthError, updateEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';

async function updateUserEmail(email: string) {
  try {
    const res = await updateEmail(auth.currentUser!, email);
    return res;
  } catch (error: unknown) {
    return (error as AuthError).code;
  }
}

export default updateUserEmail;
