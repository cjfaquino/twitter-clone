import Reply from './Reply';

export default class Tweet extends Reply {
  constructor(messageText, setPrivacy = 'false') {
    super(messageText);
    this.privacy = setPrivacy;
  }
}
