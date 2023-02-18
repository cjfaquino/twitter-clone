import { TweetObj } from '../../interfaces/TweetObj';
import getUserUid from '../user/getUserUid';
import isUserSignedIn from '../user/isUserSignedIn';

export default (replies: TweetObj[]): boolean => {
  if (!isUserSignedIn() || !replies || replies.length === 0) return false;

  return replies.some((reply) => reply.USER_ID === getUserUid());
};
