import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase-config';
import createProfile from './createProfile';
import createUser from './createUser';

interface IArgs {
  photoURL: string;
  displayName: string;
  userName: string;
  email: string;
  password: string;
}

export default async function createUserWithProfile({
  photoURL,
  displayName,
  userName,
  email,
  password,
}: IArgs): Promise<boolean> {
  try {
    // create firebase auth user
    const userProfile = await createUser(email, password);

    // create and save profile to firestore
    await createProfile({ user: userProfile, userName, displayName, photoURL });

    return true;
  } catch (error) {
    // delete firebase auth user if createProfile fails

    deleteUser(auth.currentUser!);

    console.log(error);
    return false;
  }
}
