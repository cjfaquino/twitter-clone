import { serverTimestamp, Timestamp } from 'firebase/firestore';
import getProfilePicUrl from '../utils/getProfilePicUrl';
import getDisplayName from '../utils/getDisplayName';
import getUserName from '../utils/getUserName';
import getUserUid from '../utils/getUserUid';
import textToCleanedTextArray from '../utils/textToCleanedTextArray';
import getTagsFromTextArray from '../utils/getTagsFromTextArray';
// eslint-disable-next-line import/no-cycle
import { TweetObj } from '../interfaces/TweetObj';

interface Tweet {
  USER_NAME: string;
  USER_DISPLAY: string;
  USER_ID: string;
  USER_ICON: string;
  text: string;
  tags: string;
  timestamp: Timestamp;
  likes: number;
  retweets: number;
  views: number;
  aReplyTo: TweetObj | null;
}

class Tweet {
  constructor(messageText: string, aReplyTo: TweetObj | null = null) {
    const textArray = textToCleanedTextArray(messageText);

    this.USER_NAME = getUserName();
    this.USER_DISPLAY = getDisplayName()!;
    this.USER_ID = getUserUid();
    this.USER_ICON = getProfilePicUrl();
    this.timestamp = serverTimestamp() as Timestamp;
    this.text = messageText.trim();
    this.tags = getTagsFromTextArray(textArray);
    this.likes = 0;
    this.retweets = 0;
    this.views = 0;
    this.aReplyTo = aReplyTo;
  }
}

export default Tweet;
