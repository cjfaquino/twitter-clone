import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const loginWithGooglePopup = async () => {
  // Sign in Firebase using popup auth and Google as the identity provider.
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

export default loginWithGooglePopup;
