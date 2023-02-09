import { deleteDoc, doc } from 'firebase/firestore';
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

    // delete from follwers & following collection in users
    await Promise.all([deleteDoc(followersRef), deleteDoc(followingRef)]);

    // fire profile event
    eventProfileEdit();
  } catch (error) {
    console.log(error);
  }
};

export default unfollowUser;
