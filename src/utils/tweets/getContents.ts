import { TweetObj } from '../../interfaces/TweetObj';

export default (tweetObj: TweetObj) => {
  let obj;
  // gets retweet content if available
  // otherwise just get normal tweet

  if (tweetObj.aRetweetOf) {
    obj = { ...tweetObj.aRetweetOf, USER_ID: tweetObj.USER_ID };
  } else {
    obj = tweetObj;
  }
  return obj;
};
