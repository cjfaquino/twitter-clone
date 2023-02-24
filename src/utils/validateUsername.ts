import CustomError from '../classes/CustomError';
import UserName from '../classes/UserName';
import checkUserNameAlreadyExists from './user/checkUsernameAlreadyExists';

const validateUsername = async (username: string): Promise<boolean> => {
  const regex = /^[a-zA-Z][a-zA-Z0-9_]+$/;
  const firstLetterRegex = /^[a-zA-Z]/;
  const MAX = UserName.max;
  const MIN = UserName.min;

  const minLength: boolean = username.length >= MIN;
  const maxLength: boolean = username.length <= MAX;
  const firstLetter: boolean = firstLetterRegex.test(username);
  const nameRegex: boolean = regex.test(username);
  const exists: boolean = await checkUserNameAlreadyExists(username);

  let errorMessage = '';

  if (!firstLetter) {
    errorMessage = 'first letter must be a letter';
  } else if (!nameRegex) {
    errorMessage = 'only letters, numbers, & underscores allowed';
  } else if (!minLength) {
    errorMessage = `minimum of ${MIN} characters`;
  } else if (!maxLength) {
    errorMessage = `maximum of ${MAX} characters`;
  } else if (exists) errorMessage = 'already exists';

  const validity =
    !exists && minLength && maxLength && nameRegex && firstLetter;

  if (!validity) throw new CustomError(errorMessage, 'Username Error');

  return validity;
};

export default validateUsername;
