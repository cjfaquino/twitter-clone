import validatePassword from '../validatePassword';

describe.only('validatePassword tests', () => {
  it('should be at 8 to 24 characters long', () => {
    expect(() => validatePassword('12345', '12345')).toThrow(/characters/);
    expect(() =>
      validatePassword('1234567890123456789012345', '1234567890123456789012345')
    ).toThrow(/characters/);

    expect(validatePassword('password123!', 'password123!')).toBeTruthy();
  });

  it('should contain at least one number', () => {
    expect(() => validatePassword('password', 'password')).toThrow(/number/);
  });

  it('should contain at least one letter', () => {
    expect(() => validatePassword('123445678990', '123445678990')).toThrow(
      /letter/
    );
  });

  it('should contain at least one special character', () => {
    expect(() => validatePassword('asdf1234a', 'asdf1234a')).toThrow(/special/);
  });

  it('should be matching ', () => {
    expect(validatePassword('password123!', 'password123!')).toBeTruthy();
    expect(() => validatePassword('password123!', '123password!')).toThrow(
      /matching/
    );
  });
});
