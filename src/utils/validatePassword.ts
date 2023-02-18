import ConfirmPasswordError from '../classes/ConfirmPasswordError';
import PasswordError from '../classes/PasswordError';

export default (password: string, confirmPassword: string): boolean => {
  const digitRegex = /(?=.*\d)/;
  const letterRegex = /(?=.*[a-zA-Z])/;
  const specialRegex = /(?=.*[!@#$%^&*()_+])/;
  const MIN = 8;
  const MAX = 24;

  const minLength = password.length >= MIN;
  const maxLength = password.length <= MAX;
  const atLeastOneDigit = digitRegex.test(password);
  const atLeastOneLetter = letterRegex.test(password);
  const atLeastOneSpecial = specialRegex.test(password);
  const matching = password === confirmPassword;

  let errorMessage = '';
  if (!minLength || !maxLength) {
    errorMessage = `should be at ${MIN} to ${MAX} characters long`;
  } else if (!atLeastOneDigit) {
    errorMessage = 'should contain at least one number';
  } else if (!atLeastOneLetter) {
    errorMessage = 'should contain at least one letter';
  } else if (!atLeastOneSpecial) {
    errorMessage = 'should contain at least one special character';
  } else if (!matching) {
    errorMessage = 'should be matching';
  }

  const validity =
    minLength &&
    maxLength &&
    atLeastOneDigit &&
    atLeastOneLetter &&
    atLeastOneSpecial;

  if (!validity) throw new PasswordError(errorMessage);
  if (!matching) throw new ConfirmPasswordError(errorMessage);

  return validity && matching;
};
