import validatePic from '../validatePic';

const tooLarge = new File([''], 'test.png', { type: 'image/jpeg' });
const smallPic = new File([''], 'test.png', { type: 'image/jpeg' });
const wrongType = new File([''], 'test.txt');

Object.defineProperty(tooLarge, 'size', { value: 1024 * 1024 * 5 + 1 });
Object.defineProperty(smallPic, 'size', { value: 1024 * 1024 * 5 });

describe('validatePic tests', () => {
  it('should return false if size is too large', () => {
    expect(() => validatePic(tooLarge)).toThrow(/large/);
  });

  it('should return false if not jpeg/webp', () => {
    expect(() => validatePic(wrongType)).toThrow(/jpeg|webp/);
  });

  it('should return true if right size and type', () => {
    expect(validatePic(smallPic)).toBeTruthy();
  });
});
