import DisplayName from '../../classes/DisplayName';
import validateDisplayName from '../validateDisplayName';

describe('validateDisplayName tests', () => {
  it(`should return false if longer than ${DisplayName.max} characters`, () => {
    expect(() =>
      validateDisplayName(
        'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdflkjhgzxcvmnbhasdfrewqyiou'
      )
    ).toThrow(/long/);
  });

  it(`should return false if shorter than ${DisplayName.min} characters`, () => {
    expect(() => validateDisplayName('s')).toThrow(/short/);
  });

  it(`should return true if in between ${DisplayName.min} - ${DisplayName.max} characters`, () => {
    expect(validateDisplayName('test_test')).toBeTruthy();
  });
});
