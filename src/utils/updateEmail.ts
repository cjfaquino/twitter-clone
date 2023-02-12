import { updateEmail } from 'firebase/auth';
import { auth } from '../firebase-config';

async function updateUserEmail(email: string) {
  try {
    const res = await updateEmail(auth.currentUser!, email);
    return res;
  } catch (error: any) {
    return error.code;
  }
}

export default updateUserEmail;
