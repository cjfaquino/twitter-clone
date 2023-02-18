import validatePassword from '../validatePassword';

describe('validatePassword tests', () => {
  it('should be at  8 to 24 characters long', () => {
    expect(validatePassword('12345', '12345')).toMatchObject({
      validity: false,
      errorMessage: 'should be at 8 to 24 characters long',
    });
    expect(
      validatePassword('1234567890123456789012345', '1234567890123456789012345')
    ).toMatchObject({
      validity: false,
      errorMessage: 'should be at 8 to 24 characters long',
    });

    expect(validatePassword('password123!', 'password123!')).toMatchObject({
      validity: true,
      errorMessage: '',
    });
  });

  it('should contain at least one number', () => {
    expect(validatePassword('password', 'password')).toMatchObject({
      validity: false,
      errorMessage: 'should contain at least one number',
    });
  });

  it('should contain at least one letter', () => {
    expect(validatePassword('123445678990', '123445678990')).toMatchObject({
      validity: false,
      errorMessage: 'should contain at least one letter',
    });
  });

  it('should contain at least one special character', () => {
    expect(validatePassword('asdf1234a', 'asdf1234a')).toMatchObject({
      validity: false,
      errorMessage: 'should contain at least one special character',
    });
  });

  it('should be matching ', () => {
    expect(validatePassword('password123!', 'password123!')).toMatchObject({
      validity: true,
      errorMessage: '',
    });
    expect(validatePassword('password123!', '123password!')).toMatchObject({
      validity: false,
      errorMessage: 'should be matching',
    });
  });
});
