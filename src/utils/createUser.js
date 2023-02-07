import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

const createUser = async (email, password) => {
  try {
    const auth = getAuth();
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
    console.log(error.code, error.message);
    return false;
  }
};

export default createUser;
