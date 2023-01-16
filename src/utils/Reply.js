import { serverTimestamp } from 'firebase/firestore';
import { getUserUid, getDisplayName, getProfilePicUrl } from '../firebase';

export default class Reply {
  constructor(messageText) {
    this.USER_ID = getUserUid();
    this.USER_NAME = getDisplayName();
    this.USER_ICON = getProfilePicUrl();
    this.text = messageText;
    this.timestamp = serverTimestamp();
  }
}
