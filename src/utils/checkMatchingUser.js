import { getUserUid } from '../firebase';
import { isUserSignedIn } from '../isUserSignedIn';

// Returns true if matching users

const checkMatchingUser = async (userID) => {
  if (!isUserSignedIn()) return false;
  return (await getUserUid()) === userID;
};

export default checkMatchingUser;
