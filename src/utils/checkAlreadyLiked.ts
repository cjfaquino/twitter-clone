import { TweetObj } from '../interfaces/TweetObj';
import { UserProfile } from '../interfaces/UserProfile';

const checkAlreadyLiked = (tweetID: string, userProfile: UserProfile) => {
  if (!userProfile) return false;

  const { likes } = userProfile;

  if (
    (userProfile.id === 'no-id' && !userProfile.doneLoading) ||
    !likes ||
    likes.length === 0
  )
    return false;

  return likes.some((liked: TweetObj) => liked.id === tweetID);
};

export default checkAlreadyLiked;
