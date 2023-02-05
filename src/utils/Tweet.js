import { serverTimestamp } from 'firebase/firestore';
import getProfilePicUrl from './getProfilePicUrl';
import getDisplayName from './getDisplayName';
import getUserName from './getUserName';
import getUserUid from './getUserUid';

export default class Tweet {
  constructor(messageText, aReplyTo = null) {
    this.USER_NAME = getUserName();
    this.USER_DISPLAY = getDisplayName();
    this.USER_ID = getUserUid();
    this.USER_ICON = getProfilePicUrl();
    this.text = messageText.toString().split(' ');
    this.timestamp = serverTimestamp();
    this.likes = 0;
    this.retweets = 0;
    this.views = 0;
    this.aReplyTo = aReplyTo;
  }
}
