import { serverTimestamp } from 'firebase/firestore';
import { getUserUid, getDisplayName, getProfilePicUrl } from '../firebase';

export default class Tweet {
  constructor(messageText, aReplyTo = null) {
    this.USER_ID = getUserUid();
    this.USER_NAME = getDisplayName();
    this.USER_ICON = getProfilePicUrl();
    this.text = messageText;
    this.timestamp = serverTimestamp();
    this.replies = [];
    this.likes = [];
    this.retweets = [];
    this.aReplyTo = aReplyTo;
  }
}
