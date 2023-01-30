import { getUserUid } from '../firebase';
import checkDocAlreadyExists from './checkDocAlreadyExists';

const checkAlreadyFollowing = async (targetID) =>
  checkDocAlreadyExists('users', getUserUid(), 'following', targetID);

export default checkAlreadyFollowing;
