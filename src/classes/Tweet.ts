import { serverTimestamp, Timestamp } from 'firebase/firestore';
import getProfilePicUrl from '../utils/user/getProfilePicUrl';
import getDisplayName from '../utils/user/getDisplayName';
import getUserName from '../utils/user/getUserName';
import getUserUid from '../utils/user/getUserUid';
import textToCleanedTextArray from '../utils/formatters/textToCleanedTextArray';
import getTagsFromTextArray from '../utils/formatters/getTagsFromTextArray';
// eslint-disable-next-line import/no-cycle
import { TweetObj } from '../interfaces/TweetObj';

interface Tweet {
  USER_NAME: string;
  USER_DISPLAY: string;
  USER_ID: string;
  USER_ICON: string;
  imgURL: string | null;
  text: string;
  tags: string;
  timestamp: Timestamp;
  likes: number;
  retweets: number;
  views: number;
  aReplyTo: TweetObj | null;
  aRetweetOf: TweetObj | null;
  retweet_ID?: string;
}

export interface IArgs {
  messageText: string;
  messageImg?: string | null;
  aReplyTo?: TweetObj | null;
  aRetweetOf?: TweetObj | null;
}
class Tweet {
  constructor({
    messageText,
    messageImg = null,
    aReplyTo = null,
    aRetweetOf = null,
  }: IArgs) {
    const textArray = textToCleanedTextArray(messageText);

    this.USER_NAME = getUserName();
    this.USER_DISPLAY = getDisplayName()!;
    this.USER_ID = getUserUid();
    this.USER_ICON = getProfilePicUrl();
    this.timestamp = serverTimestamp() as Timestamp;
    this.imgURL = messageImg;
    this.text = messageText.trim();
    this.tags = getTagsFromTextArray(textArray);
    this.likes = 0;
    this.retweets = 0;
    this.views = 0;
    this.aReplyTo = aReplyTo;
    this.aRetweetOf = aRetweetOf;
  }
}

export default Tweet;
