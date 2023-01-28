import { getAuth, linkWithPopup, GoogleAuthProvider } from 'firebase/auth';
import setErrorMessage from './setErrorMessage';

const linkWithGooglePopup = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const result = await linkWithPopup(auth.currentUser, provider);
    return result;
  } catch (error) {
    let message = 'Something went wrong. Please try again.';
    if (error.code === 'auth/credential-already-in-use')
      message = 'An account with these credentials already exists';

    setErrorMessage('.link-google-account > .error', message);
    return undefined;
  }
};

export default linkWithGooglePopup;
