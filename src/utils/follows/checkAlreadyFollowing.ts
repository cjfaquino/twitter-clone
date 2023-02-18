import checkDocAlreadyExists from '../checkDocAlreadyExists';
import getUserUid from '../user/getUserUid';
import isUserSignedIn from '../user/isUserSignedIn';

const checkAlreadyFollowing = async (targetID: string) => {
  if (isUserSignedIn()) {
    return checkDocAlreadyExists('users', getUserUid(), 'following', targetID);
  }
  return false;
};

export default checkAlreadyFollowing;
