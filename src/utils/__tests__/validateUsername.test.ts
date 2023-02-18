import validateUsername from '../validateUsername';

describe('validateUsername test', () => {
  it.concurrent('should show message when too short', async () => {
    expect(await validateUsername('tes')).toMatchObject({
      validity: false,
      errorMessage: 'minimum of 4 characters',
    });
  });

  it.concurrent('should show message when too long', async () => {
    expect(await validateUsername('test01234567890123456789')).toMatchObject({
      validity: false,
      errorMessage: 'maximum of 15 characters',
    });
  });

  it.concurrent(
    'should show message when not using letters, numbers or underscores only',
    async () => {
      expect(await validateUsername('test$')).toMatchObject({
        validity: false,
        errorMessage: 'only letters, numbers, & underscores allowed',
      });
      expect(await validateUsername('test79432_')).toMatchObject({
        validity: true,
        errorMessage: '',
      });
    }
  );

  it.concurrent(
    'should not allow underscore or numbers in the beginning',
    async () => {
      expect(await validateUsername('_test')).toMatchObject({
        validity: false,
        errorMessage: 'first letter must be a letter',
      });

      expect(await validateUsername('1test')).toMatchObject({
        validity: false,
        errorMessage: 'first letter must be a letter',
      });
    }
  );
});
