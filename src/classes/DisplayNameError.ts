export default class DisplayNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DisplayName Error';
  }
}
