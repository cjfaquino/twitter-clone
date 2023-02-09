import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import getUserUid from './getUserUid';
import { UserProfile } from '../interfaces/UserProfile';

export default async function followUser(
  currentUserProfileObj: UserProfile,
  targetUserProfileObj: UserProfile
) {
  // add tweet to like in user profile
  try {
    // add to targets followers
    const followersRef = doc(
      db,
      'users',
      targetUserProfileObj.id,
      'followers',
      getUserUid()
    );
    // add to your following
    const followingRef = doc(
      db,
      'users',
      getUserUid(),
      'following',
      targetUserProfileObj.id
    );

    // add to follwers & following collection in users
    await Promise.all([
      setDoc(followersRef, currentUserProfileObj),
      setDoc(followingRef, targetUserProfileObj),
    ]);

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
}
