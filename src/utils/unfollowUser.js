import { deleteDoc, doc } from 'firebase/firestore';
import { getUserUid } from '../firebase';
import { db } from '../firebase-config';
import eventProfileEdit from './eventProfileEdit';

const unfollowUser = async (targetUserProfileObj, currentUserProfileObj) => {
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

    // delete from follwers & following collection in users
    await Promise.all([
      deleteDoc(followersRef, currentUserProfileObj),
      deleteDoc(followingRef, targetUserProfileObj),
    ]);

    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default unfollowUser;
