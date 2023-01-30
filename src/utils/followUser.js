import { doc, setDoc } from 'firebase/firestore';
import { getUserUid } from '../firebase';
import { db } from '../firebase-config';
import eventProfileEdit from './eventProfileEdit';

export default async function followUser(
  currentUserProfileObj,
  targetUserProfileObj
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
