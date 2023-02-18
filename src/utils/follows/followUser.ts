import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import eventProfileEdit from '../../events/eventProfileEdit';
import getUserUid from '../user/getUserUid';
import { UserProfile } from '../../interfaces/UserProfile';
import followsConverter from './followsConverter';

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
    ).withConverter(followsConverter);
    // add to your following
    const followingRef = doc(
      db,
      'users',
      getUserUid(),
      'following',
      targetUserProfileObj.id
    ).withConverter(followsConverter);

    // increase currentUser's following count
    const countRef = doc(db, 'users', getUserUid());

    // increase targetUser's follower count
    const targetCountRef = doc(db, 'users', targetUserProfileObj.id);

    // add to followers & following collection in users
    await Promise.all([
      setDoc(followersRef, currentUserProfileObj),
      setDoc(followingRef, targetUserProfileObj),
      updateDoc(countRef, { following: increment(1) }),
      updateDoc(targetCountRef, { followers: increment(1) }),
    ]);

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
}
