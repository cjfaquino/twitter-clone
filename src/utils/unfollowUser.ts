import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';
import getUserUid from './getUserUid';
import { db } from '../firebase-config';
import eventProfileEdit from '../events/eventProfileEdit';
import { UserProfile } from '../interfaces/UserProfile';

const unfollowUser = async (targetUserProfileObj: UserProfile) => {
  try {
    // delete from targets followers
    const followersRef = doc(
      db,
      'users',
      targetUserProfileObj.id,
      'followers',
      getUserUid()
    );
    // delete from your following
    const followingRef = doc(
      db,
      'users',
      getUserUid(),
      'following',
      targetUserProfileObj.id
    );

    // lower currentUser's following count
    const countRef = doc(db, 'users', getUserUid());

    // lower targetUser's follower count
    const targetCountRef = doc(db, 'users', targetUserProfileObj.id);

    // delete from followers & following collection in users
    await Promise.all([
      deleteDoc(followersRef),
      deleteDoc(followingRef),
      updateDoc(countRef, { following: increment(-1) }),
      updateDoc(targetCountRef, { followers: increment(-1) }),
    ]);

    // fire profile event
    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default unfollowUser;
