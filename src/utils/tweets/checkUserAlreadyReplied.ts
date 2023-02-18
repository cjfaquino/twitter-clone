import { TweetObj } from '../../interfaces/TweetObj';
import getUserUid from '../getUserUid';
import isUserSignedIn from '../isUserSignedIn';

export default (replies: TweetObj[]): boolean => {
  if (!isUserSignedIn() || !replies || replies.length === 0) return false;

  return replies.some((reply) => reply.USER_ID === getUserUid());
};
