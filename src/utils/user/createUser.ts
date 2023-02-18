import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../firebase-config';

const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      sendEmailVerification(user);
      return user;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createUser;
