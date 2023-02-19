import validateUsername from '../validateUsername';

describe.only('validateUsername test', () => {
  it.concurrent('should show message when too short', async () => {
    expect(async () => {
      await validateUsername('tes');
    }).rejects.toThrowError();
  });

  it.concurrent('should show message when too long', async () => {
    expect(async () => {
      await validateUsername('test01234567890123456789');
    }).rejects.toThrowError();
  });

  it.concurrent(
    'should show message when not using letters, numbers or underscores only',
    async () => {
      expect(async () => {
        await validateUsername('test$');
      }).rejects.toThrowError();
      expect(async () => {
        await validateUsername('test79432_');
      }).toBeTruthy();
    }
  );

  it.concurrent(
    'should not allow underscore or numbers in the beginning',
    async () => {
      expect(async () => {
        await validateUsername('_test');
      }).rejects.toThrowError();

      expect(async () => {
        await validateUsername('1test');
      }).rejects.toThrowError();
    }
  );
});
