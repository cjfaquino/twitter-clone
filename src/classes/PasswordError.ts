export default class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Password Error';
  }
}
