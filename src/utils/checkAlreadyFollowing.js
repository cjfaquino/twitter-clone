import checkDocAlreadyExists from './checkDocAlreadyExists';
import getUserUid from './getUserUid';

const checkAlreadyFollowing = async (targetID) =>
  checkDocAlreadyExists('users', await getUserUid(), 'following', targetID);

export default checkAlreadyFollowing;
