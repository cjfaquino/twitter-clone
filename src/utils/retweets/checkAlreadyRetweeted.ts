import { TweetObj } from '../../interfaces/TweetObj';
import { UserProfile } from '../../interfaces/UserProfile';

const checkAlreadyRetweeted = (tweetID: string, userProfile: UserProfile) => {
  if (!userProfile) return false;

  const { retweets } = userProfile;

  if (
    (userProfile.id === 'no-id' && !userProfile.doneLoading) ||
    !retweets ||
    retweets.length === 0
  )
    return false;

  return retweets.some((retweet: TweetObj) => retweet.id === tweetID);
};

export default checkAlreadyRetweeted;
