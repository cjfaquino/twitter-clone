import { serverTimestamp } from 'firebase/firestore';
import getProfilePicUrl from './getProfilePicUrl';
import getDisplayName from './getDisplayName';
import getUserName from './getUserName';
import getUserUid from './getUserUid';
import textToCleanedTextArray from './textToCleanedTextArray';

interface Tweet {
  USER_NAME: string;
  USER_DISPLAY: string;
  USER_ID: string;
  USER_ICON: string;
  text: string[];
  timestamp: {};
  likes: number;
  retweets: number;
  views: number;
  aReplyTo: Tweet | null;
}

export interface TweetObj extends Tweet {
  id: string;
}

class Tweet {
  constructor(messageText: string, aReplyTo: Tweet | null = null) {
    this.USER_NAME = getUserName();
    this.USER_DISPLAY = getDisplayName();
    this.USER_ID = getUserUid();
    this.USER_ICON = getProfilePicUrl();
    this.text = textToCleanedTextArray(messageText);
    this.timestamp = serverTimestamp();
    this.likes = 0;
    this.retweets = 0;
    this.views = 0;
    this.aReplyTo = aReplyTo;
  }
}

export default Tweet;
