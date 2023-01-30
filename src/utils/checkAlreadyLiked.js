import { getUserUid } from '../firebase';
import checkDocAlreadyExists from './checkDocAlreadyExists';

const checkAlreadyLiked = async (tweetID) =>
  checkDocAlreadyExists('users', getUserUid(), 'likes', tweetID);

export default checkAlreadyLiked;
