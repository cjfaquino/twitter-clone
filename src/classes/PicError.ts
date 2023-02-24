export default class PicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Pic Error';
  }
}
