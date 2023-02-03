import checkDocAlreadyExists from './checkDocAlreadyExists';
import getUserUid from './getUserUid';

const checkAlreadyLiked = async (tweetID) =>
  checkDocAlreadyExists('users', getUserUid(), 'likes', tweetID);

export default checkAlreadyLiked;
