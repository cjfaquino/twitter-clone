import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const loginWithEmailAndPass = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const { user } = userCredential;
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default loginWithEmailAndPass;
