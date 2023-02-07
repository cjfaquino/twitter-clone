import { deleteUser, getAuth } from 'firebase/auth';
import createProfile from './createProfile';
import createUser from './createUser';

export default async function createUserWithProfile({
  photoURL,
  displayName,
  userName,
  email,
  password,
}): Promise<boolean> {
  try {
    // create firebase auth user
    const userProfile = await createUser(email, password);

    // create and save profile to firestore
    await createProfile({ user: userProfile, userName, displayName, photoURL });

    return true;
  } catch (error) {
    // delete firebase auth user if createProfile fails

    deleteUser(getAuth().currentUser!);

    console.log(error);
    return false;
  }
}
