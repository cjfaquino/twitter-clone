import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import firebaseErrorMessage from './firebaseErrorMessages';
import setErrorMessage from './setErrorMessage';

const loginWithEmailAndPass = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const { user } = userCredential;
    return user;
  } catch (error: any) {
    const message = firebaseErrorMessage(error.code);

    setErrorMessage('.login-form .login-email.error', message);
    return false;
  }
};

export default loginWithEmailAndPass;
