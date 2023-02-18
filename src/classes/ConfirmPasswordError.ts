export default class ConfirmPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Confirm Password Error';
  }
}
