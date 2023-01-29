import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const createUser = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      // send email verification
      userCredential.user.sendEmailVerification();
      return userCredential.user.uid;
    }
    return undefined;
  } catch (error) {
    console.log(error.code, error.message);
    return false;
  }
};

export default createUser;
