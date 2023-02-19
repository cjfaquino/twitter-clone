export default class UsernameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Username Error';
  }
}
