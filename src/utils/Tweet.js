import { serverTimestamp } from 'firebase/firestore';
import { getUserUid, getDisplayName, getProfilePicUrl } from '../firebase';
import getUserName from './getUserName';

export default class Tweet {
  constructor(messageText, aReplyTo = null) {
    this.USER_NAME = getUserName();
    this.USER_DISPLAY = getDisplayName();
    this.USER_ID = getUserUid();
    this.USER_ICON = getProfilePicUrl();
    this.text = messageText;
    this.timestamp = serverTimestamp();
    this.replies = [];
    this.likes = 0;
    this.retweets = 0;
    this.views = 0;
    this.aReplyTo = aReplyTo;
  }
}
